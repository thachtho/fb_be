import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModules } from './gateway/gateway.modules';
import { HttpModule } from '@nestjs/axios';
import { DistanceModule } from './distance/distance.module';

@Module({
  imports: [
    GatewayModules,
    ScheduleModule.forRoot(),
    HttpModule.register({}),
    DistanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
