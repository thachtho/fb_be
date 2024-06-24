import { Module } from '@nestjs/common';
import { UsersOnlineService } from './users-online.service';
import { UsersOnlineController } from './users-online.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({})
  ],
  controllers: [UsersOnlineController],
  providers: [UsersOnlineService],
  exports: [UsersOnlineService]
})
export class UsersOnlineModule {}
