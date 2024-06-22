import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(phone: any, pass: any, type?: 'web' | 'mobile'): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    createToken(payload: {
        phone: string;
        userId: number;
        type: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshToken: string, res: Response): Promise<Response<any, Record<string, any>>>;
    register(createUserDto: CreateUserDto): Promise<any>;
}
