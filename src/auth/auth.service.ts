import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phone, pass, type: 'web' | 'mobile' = 'web') {
    const user = await this.usersService.findByPhone(phone) as any[];

    if (user.length > 0) {
      const currentUser = user[0]

      if (currentUser?.password !== pass) {
        throw new HttpException('Mật khẩu không đúng', 403)
      }
      if (!currentUser?.access) {
        throw new HttpException('Vào nhóm Zalo ở dưới thông báo lên nhóm để được duyệt miễn phí', 403)
      }

      const payload = { userId: currentUser.id, phone: currentUser.phone, type };
  
      return this.createToken(payload);
    }

    throw new HttpException('Tên tài khoản không đúng', 403)
  }

  async createToken(payload: { phone: string; userId: number; type: string }) {
    if (payload?.type === 'mobile') {
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(payload),
      };
    }
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshToken: string, res: Response) {
    try {
      const decodedToken = this.jwtService.verify(refreshToken);
      const refreshTokenExp = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > refreshTokenExp) {
        return res.status(402).json({ refresh: false });
      }

      const payload = {
        userId: decodedToken.userId,
        phone: decodedToken.phone,
        type: 'web',
      };
      const { access_token, refresh_token } = await this.createToken(payload);

      res.setHeader('Set-Cookie', [`token=${access_token}; HttpOnly; Path=/`]);

      return res.send({ refresh_token });
    } catch (error) {
      return res.status(402).json({ message: 'Refresh token đã hết hạn' });
    }
  }

  register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
