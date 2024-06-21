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


interface Message {
  name: string;
  postId: string;
  content: string;
  created_at?: Date;
  userId?: string;
  startNavigator?: any
}

@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly httpService: HttpService) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO server initialized');
  }

  async handleConnection(client: Socket) {
    console.log('connectionnnnnnnnnnnn');
  }

  handleDisconnect(client: Socket) {
    console.log('Ngat ket noi!.', client.id);
  }

  @SubscribeMessage('message')
  async handleRemovmessageseMessage(client: Socket, payload: Message) {
    let posts = Post.posts;
    const check: any = posts.find((item) => item.postId === payload.postId);

    if (!check) {
      if (posts.length === 20) {
        posts.pop();
      }

      posts.unshift({
        ...payload,
      });
    } else {
      if(payload?.startNavigator) {
        check.startNavigator = payload.startNavigator
      }
      if (payload.content.length > 0) {
        check.content = payload.content
      }

      if (payload.name.length > 0) {
        check.name = payload.name
      }

      posts = [...posts]
    }


    if (payload.content.length === 0 || payload.name.length === 0) {
      return;
    }
    // console.log(1111, payload)

    void this.server.emit('postMessage', posts);
  }
}
