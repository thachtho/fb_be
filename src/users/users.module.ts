import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schemas/users.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    HttpModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
