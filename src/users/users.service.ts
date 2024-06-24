import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BASE_URL_JSON_SERVER } from 'src/libs/constant';

@Injectable()
export class UsersService {
  constructor(
    // @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private readonly httpService: HttpService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExit: any[] = await this.findByPhone(createUserDto.phone)

    if (userExit.length > 0) {
      throw new HttpException('Số điện thoại đã tồn tại!', 501)
    }
    const api = this.httpService.post(
      `${BASE_URL_JSON_SERVER}/users`, createUserDto
    );

    return (await lastValueFrom(api))?.data;
  }

  async findAll() {
    const api = this.httpService.get(
      `${BASE_URL_JSON_SERVER}/users`
    );

    return (await lastValueFrom(api))?.data;
  }

  async findOne(id: string) {
    const api = this.httpService.get(
      `${BASE_URL_JSON_SERVER}/users/${id}`
    );
  
    return (await lastValueFrom(api))?.data
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const api = this.httpService.delete(
      `${BASE_URL_JSON_SERVER}/users/${id}`
    );

    return (await lastValueFrom(api))?.data;
  }

  async findByPhone(phone: string) {
    const api = this.httpService.get(
      `${BASE_URL_JSON_SERVER}/users?phone=${phone}`
    );

    return (await lastValueFrom(api))?.data;
  }

  async accessById(id: string) {
    const api = this.httpService.patch(
      `${BASE_URL_JSON_SERVER}/users/${id}`, {
        access: true
      }
    );

    return (await lastValueFrom(api))?.data;
  }

  async accessByPhone(phone: string) {
    const user: any[] = await this.findByPhone(phone);

    if (user.length > 0) {
      return this.accessById(user[0].id)
    }

    throw new HttpException('Không tìm thấy User!', 500)
  }
}
