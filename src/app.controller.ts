import { Controller, Get } from '@nestjs/common';
import { Message, Post } from './static/Post';

@Controller()
export class AppController {
  @Get('post')
  getPost(): Message[] {
    const posts = Post.posts;
    return posts;
  }
}
