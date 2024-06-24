import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';
import { DistanceModule } from 'src/distance/distance.module';

@Module({
  imports: [HttpModule, DistanceModule],
  providers: [AppGateway, JwtService],
  controllers: [],
})
export class GatewayModules {}
