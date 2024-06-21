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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let UsersService = class UsersService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async create(createUserDto) {
        const userExit = await this.findByPhone(createUserDto.phone);
        if (userExit.length > 0) {
            throw new common_1.HttpException('Số điện thoại đã tồn tại!', 501);
        }
        const api = this.httpService.post(`http://localhost:4000/users`, createUserDto);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    getUser() {
    }
    findAll() {
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findByPhone(phone) {
        const api = this.httpService.get(`http://localhost:4000/users?phone=${phone}`);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UsersService);
//# sourceMappingURL=users.service.js.map