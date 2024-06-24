/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpService } from '@nestjs/axios';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Post } from 'src/static/Post';
import { UsersOnlineService } from 'src/users-online/users-online.service';

interface Message {
  name: string;
  postId: string;
  content: string;
  created_at?: Date;
  userId?: string;
  startNavigator?: any
}

interface IClientSocketUser {
  phone: string; 
  socketId: string 
}

@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  public listUser = [];
  constructor(
    private readonly httpService: HttpService,
    private readonly usersOnlineService: UsersOnlineService,
  ) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO server initialized');
  }

  async handleConnection(client: Socket) {
    const phone = client.handshake?.query?.phone as string;
    console.log(111, phone)
    // if (phone) {
    //   this.addUser({ phone, socketId: client.id });
    // }
    console.log('connectionnnnnnnnnnnn');

  }

  handleDisconnect(client: Socket) {
    console.log('Ngat ket noi!.', client.id);
    // const phone = client.handshake?.query?.phone as string;

    // if (phone) {
    //   return this.removeUser(phone);
    // }
  }

  @SubscribeMessage('message')
  async handleRemovmessageseMessage(client: Socket, payload: Message) {
    if (payload.name === 'Người tham gia ẩn danh') {
      payload.name = '[Ẩn danh - Nguy Hiểm]'
    }
    let posts = Post.posts;
    const check: any = posts.find((item) => item.postId === payload.postId);

    if (!check) {
      if (posts.length === 20) {
        posts.pop();
      }

      posts.unshift({
        ...payload,
      });

      void this.server.emit('postMessage', payload);
    } else {
      if(payload?.startNavigator) {
        check.startNavigator = payload.startNavigator
      }
      if (payload.content.length > 0) {
        check.content = payload.content
      }

      if (payload?.name && payload.name.length > 0) {
        check.name = payload?.name
      }

      posts = [...posts]
    }
  }


  async addUser(user: IClientSocketUser) {
    const { phone } = user;
    const userExit: any[] = await this.usersOnlineService.findByPhone(phone, 'usersOnline')

    if (userExit.length === 0) {
      return this.usersOnlineService.create(user, 'usersOnline')
    }
  }

  async removeUser(phone: string) {
    const currentUser: any[] = await this.usersOnlineService.findByPhone(phone, 'usersOnline')

    if (currentUser.length > 0) {
      return this.usersOnlineService.remove(currentUser[0].id, 'usersOnline')
    }
  }
}
