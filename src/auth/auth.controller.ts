import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/libs/guard/guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: LoginDto,
    @Res()
    res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.phone,
      signInDto.password,
      'web',
    );

    res.setHeader('Set-Cookie', [`token=${access_token}; HttpOnly; Path=/`]);

    return res.send({ refresh_token });       
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string },
    @Res()
    res: Response,
  ) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken, res);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
