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
import { DistanceService } from 'src/distance/distance.service';
import { getAddress } from 'src/libs/utils/location';
import { Post } from 'src/static/Post';
import { UsersOnline } from 'src/static/UserOnline';


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
  constructor(
    private readonly httpService: HttpService, 
    private readonly distanceService: DistanceService
  ) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO server initialized');
  }

  async handleConnection(client: Socket) {
    const phone = client.handshake?.query?.phone as string;
    
    if (phone) {
      this.addUser({ phone, socketId: client.id });
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Ngat ket noi!.', client.id);
    this.removeUser(client.id);
  }

  @SubscribeMessage('message')
  async handleRemovmessageseMessage(client: Socket, payload: Message) {
    let posts = Post.posts;
    const check: any = posts.find((item) => item.postId === payload.postId);

    if (!check) {
      if (posts.length === 20) {
        posts.pop();
      }
      if (payload.name === 'Người tham gia ẩn danh') {
        payload.name = '[Ẩn danh - Nguy Hiểm]'
      }
      const address = getAddress(payload.content);
      // const locationStart = await this.distanceService.getLocaltionStart(address)
      console.log(11, address)
      // console.log(222, locationStart)
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


  addUser(user: IClientSocketUser) {
    const users = UsersOnline.usersOnline
    const { phone, socketId } = user;
    !users.some((user) => user.phone.toString() === phone.toString()) &&
      users.push({ phone: phone.toString(), socketId });
  }

  removeUser(socketId: string) {
    let users = UsersOnline.usersOnline
    UsersOnline.usersOnline = [...users.filter((user) => user.socketId !== socketId)];
  }
}
