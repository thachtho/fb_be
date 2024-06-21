import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument, Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    // @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private readonly httpService: HttpService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const api = this.httpService.post(
      `http://localhost:4000/users`, createUserDto
    );

    return (await lastValueFrom(api))?.data;
  }

  findAll() {
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByPhone(phone: string) {
    const api = this.httpService.get(
      `http://localhost:4000/users?phone=${phone}`
    );

    return (await lastValueFrom(api))?.data;
  }
}
