import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModules } from './gateway/gateway.modules';
import { HttpModule } from '@nestjs/axios';
import { DistanceModule } from './distance/distance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ClsModule } from 'nestjs-cls';
import { UsersOnlineModule } from './users-online/users-online.module';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    GatewayModules,
    ScheduleModule.forRoot(),
    HttpModule.register({}),
    DistanceModule,
    UsersModule,
    AuthModule,
    UsersOnlineModule,
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
