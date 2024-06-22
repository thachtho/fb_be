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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(phone, pass, type = 'web') {
        const user = await this.usersService.findByPhone(phone);
        if (user.length > 0) {
            const currentUser = user[0];
            if (currentUser?.password !== pass) {
                throw new common_1.HttpException('Mật khẩu không đúng', 403);
            }
            if (!currentUser?.access) {
                throw new common_1.HttpException('Vào nhóm Zalo ở dưới thông báo lên nhóm để được duyệt miễn phí', 403);
            }
            const payload = { userId: currentUser.id, phone: currentUser.phone, type };
            return this.createToken(payload);
        }
        throw new common_1.HttpException('Tên tài khoản không đúng', 403);
    }
    async createToken(payload) {
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
    async refreshToken(refreshToken, res) {
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
        }
        catch (error) {
            return res.status(402).json({ message: 'Refresh token đã hết hạn' });
        }
    }
    register(createUserDto) {
        return this.usersService.create(createUserDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map