import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';
import { HttpModule } from '@nestjs/axios';
import { UsersOnlineModule } from 'src/users-online/users-online.module';

@Module({
  imports: [HttpModule, UsersOnlineModule],
  providers: [AppGateway, JwtService],
  controllers: [],
})
export class GatewayModules {}
