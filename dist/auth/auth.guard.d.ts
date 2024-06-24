import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ClsService } from 'nestjs-cls';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private userService;
    private readonly cls;
    constructor(jwtService: JwtService, reflector: Reflector, userService: UsersService, cls: ClsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    private getValueByKeyInCookie;
}
