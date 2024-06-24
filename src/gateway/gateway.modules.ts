import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';

@Module({
  imports: [HttpModule],
  providers: [AppGateway, JwtService],
  controllers: [],
})
export class GatewayModules {}
