import { Controller, Get } from '@nestjs/common';
import { UsersOnlineService } from './users-online.service';

@Controller('users-online')
export class UsersOnlineController {
  constructor(private readonly usersOnlineService: UsersOnlineService) {}

  @Get()
  findAll() {
    return this.usersOnlineService.findAll('usersOnline')
  }
}
