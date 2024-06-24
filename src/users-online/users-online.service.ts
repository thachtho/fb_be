import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JsonServer } from 'src/abstract/json-server';

@Injectable()
export class UsersOnlineService extends JsonServer {
  constructor (protected readonly httpService: HttpService) {
    super(httpService)
  }

  async findBySocketId(socketId: string) {
    const data: any[] = await this.query(`socketId=${socketId}`, 'usersOnline')

    if (data.length > 0) {
      return data[0]
    }

    return null
  }
}
