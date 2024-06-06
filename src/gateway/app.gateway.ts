/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { lastValueFrom } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { Post } from 'src/Post/Post';

interface Message {
  name: string;
  postId: string;
  content: string;
  created_at?: Date;
  userId?: string;
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
    const posts = Post.posts;
    const check = posts.find((item) => item.postId === payload.postId);

    if (!check) {
      if (posts.length === 20) {
        posts.pop();
      }

      posts.unshift({
        ...payload,
      });

      void this.server.emit('postMessage', posts);
    }
  }

  @Cron('0 */1 * * * *')
  async resetIp() {
    try {
      console.log('reset ippppppppppp');
      const api = this.httpService.get(
        'https://mproxy.vn/capi/i5F0BO6PLGSh-IfhvLE20p1mLLU9qJLoMGo0hlWIW6I/key/urKK60FfLenBznL/resetIp',
      );

      const data = await lastValueFrom(api);
    } catch (error) {}
  }
}
