"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const guard_1 = require("../libs/guard/guard");
const auth_module_1 = require("./auth.module");
const users_service_1 = require("../users/users.service");
const nestjs_cls_1 = require("nestjs-cls");
let AuthGuard = class AuthGuard {
    constructor(jwtService, reflector, userService, cls) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.userService = userService;
        this.cls = cls;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(guard_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: auth_module_1.jwtConstants.secret,
            });
            request['user'] = payload;
            this.cls.set('user', JSON.stringify(payload));
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const cookieString = request.headers.cookie;
        if (cookieString) {
            const cookieToken = this.getValueByKeyInCookie(cookieString, 'token');
            if (cookieToken) {
                return cookieToken;
            }
        }
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    getValueByKeyInCookie(cookieString, key) {
        const valueCookie = cookieString
            .split(';')
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith(`${key}=`));
        let tokenValue;
        if (valueCookie) {
            const [, value] = valueCookie.split('=');
            tokenValue = value;
        }
        return tokenValue;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        users_service_1.UsersService,
        nestjs_cls_1.ClsService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map