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
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constant_1 = require("../libs/constant");
let UsersService = class UsersService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async create(createUserDto) {
        const userExit = await this.findByPhone(createUserDto.phone);
        if (userExit.length > 0) {
            throw new common_1.HttpException('Số điện thoại đã tồn tại!', 501);
        }
        const api = this.httpService.post(`${constant_1.BASE_URL_JSON_SERVER}/users`, createUserDto);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    async findAll() {
        const api = this.httpService.get(`${constant_1.BASE_URL_JSON_SERVER}/users`);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    async findOne(id) {
        const api = this.httpService.get(`${constant_1.BASE_URL_JSON_SERVER}/users/${id}`);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    async remove(id) {
        const api = this.httpService.delete(`${constant_1.BASE_URL_JSON_SERVER}/users/${id}`);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    async findByPhone(phone) {
        const api = this.httpService.get(`${constant_1.BASE_URL_JSON_SERVER}/users?phone=${phone}`);
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    async accessById(id) {
        const api = this.httpService.patch(`${constant_1.BASE_URL_JSON_SERVER}/users/${id}`, {
            access: true
        });
        return (await (0, rxjs_1.lastValueFrom)(api))?.data;
    }
    async accessByPhone(phone) {
        const user = await this.findByPhone(phone);
        if (user.length > 0) {
            return this.accessById(user[0].id);
        }
        throw new common_1.HttpException('Không tìm thấy User!', 500);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UsersService);
//# sourceMappingURL=users.service.js.map