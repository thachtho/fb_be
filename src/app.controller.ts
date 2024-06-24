import { Controller, Get } from '@nestjs/common';
import { Message, Post } from './static/Post';
import { IUsersOnline, UsersOnline } from './static/UserOnline';

@Controller()
export class AppController {
  @Get('post')
  getPost(): Message[] {
    const posts = Post.posts;
    return posts;
  }

  @Get('users-online')
  getUserOnline(): IUsersOnline[] {
    const usersOnline = UsersOnline.usersOnline;
    return usersOnline;
  }
}
