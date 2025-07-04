import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/libs/guard/guard';
import { ROUTE } from 'src/libs/constant';

@Controller(ROUTE.USERS)
@Public()
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('access-by-id/:id')
  access(@Param('id') id: string) {
    return this.usersService.accessById(id)
  }

  @Patch('access-by-phone/:phone')
  accessByPhone(@Param('phone') phone: string) {
    return this.usersService.accessByPhone(phone)
  }
}
