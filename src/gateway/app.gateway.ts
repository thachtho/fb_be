import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Queue } from 'bull';
import { Server, Socket } from 'socket.io';
import { Post } from 'src/static/Post';
import { UsersOnline } from 'src/static/UserOnline';


export interface Message {
  name: string;
  postId: string;
  content: string;
  created_at?: Date;
  userId?: string;
  locationStart?: any,
  locationEnd?: any,
  distanceAB?: number | null,
  time?: any 
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
    private eventEmitter: EventEmitter2
  ) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO server initialized');
  }

  async handleConnection(client: Socket) {
    console.log('Connection!')
    const phone = client.handshake?.query?.phone as string;
    
    if (phone) {
      console.log('Connection!')
      return this.addUser({ phone, socketId: client.id });
    }
    console.log('ko tim thay phone')
    return client.disconnect();
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
      if (payload.name === 'Anonymous participant' || payload.name === 'Người tham gia ẩn danh') {
        payload.name = '[Ẩn danh - Nguy Hiểm]'
      }
      posts.unshift({
        ...payload,
      });

      void this.eventEmitter.emit(
        'post.created',
        payload,
      );
    }
  }

  postMessage(payload: Message) {
    let posts = Post.posts;
    const currentPost: any = posts.find(item => item.postId === payload.postId)

    if (currentPost) {
      currentPost.locationStart = payload.locationStart;
      currentPost.locationEnd = payload.locationEnd;
      currentPost.time = payload?.time;
      currentPost.distanceAB = payload?.distanceAB;
    }

    void this.server.emit('postMessage', payload);
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
