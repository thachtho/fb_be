import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { DistanceModule } from './distance/distance.module';
import { GatewayModules } from './gateway/gateway.modules';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    EventEmitterModule.forRoot(),
    GatewayModules,
    ScheduleModule.forRoot(),
    HttpModule.register({}),
    DistanceModule,
    UsersModule,
    AuthModule,
    // MongooseModule.forRoot('mongodb+srv://buithanhtho31ig:bHVCkgHfEBBFi6FM@cluster0.2d5twje.mongodb.net/', {
    //   dbName: 'fb',
    // })

  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
