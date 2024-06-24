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
