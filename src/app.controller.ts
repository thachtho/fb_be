import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Message, Post } from './Post/Post';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('post')
  getPost(): Message[] {
    const posts = Post.posts;
    return posts;
  }
}
