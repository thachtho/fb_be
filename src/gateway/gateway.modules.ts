import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  providers: [AppGateway, JwtService],
  controllers: [],
})
export class GatewayModules {}
