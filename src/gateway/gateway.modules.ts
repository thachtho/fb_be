import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';
import { DistanceModule } from 'src/distance/distance.module';
import { BullModule } from '@nestjs/bull';
import { SocketProcessor } from './gateway.processor';

@Module({
  imports: [HttpModule, DistanceModule, BullModule.registerQueue({
    name: 'socket',
  })],
  providers: [AppGateway, JwtService, SocketProcessor],
  controllers: [],
})
export class GatewayModules {}
