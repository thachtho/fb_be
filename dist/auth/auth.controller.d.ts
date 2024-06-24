import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(body: {
        refreshToken: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    register(createUserDto: CreateUserDto): Promise<any>;
}
