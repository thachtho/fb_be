import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModules } from './gateway/gateway.modules';

@Module({
  imports: [GatewayModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
