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
exports.AppGateway = void 0;
const axios_1 = require("@nestjs/axios");
const schedule_1 = require("@nestjs/schedule");
const websockets_1 = require("@nestjs/websockets");
const rxjs_1 = require("rxjs");
const socket_io_1 = require("socket.io");
const Post_1 = require("../Post/Post");
let AppGateway = class AppGateway {
    constructor(httpService) {
        this.httpService = httpService;
    }
    afterInit(server) {
        console.log('Socket.IO server initialized');
    }
    async handleConnection(client) {
        console.log('connectionnnnnnnnnnnn');
    }
    handleDisconnect(client) {
        console.log('Ngat ket noi!.', client.id);
    }
    async handleRemovmessageseMessage(client, payload) {
        const posts = Post_1.Post.posts;
        const check = posts.find((item) => item.postId === payload.postId);
        if (!check) {
            if (posts.length === 20) {
                posts.pop();
            }
            posts.unshift({
                ...payload,
            });
            void this.server.emit('postMessage', posts);
        }
    }
    async resetIp() {
        try {
            console.log('reset ippppppppppp');
            const api = this.httpService.get('https://mproxy.vn/capi/i5F0BO6PLGSh-IfhvLE20p1mLLU9qJLoMGo0hlWIW6I/key/urKK60FfLenBznL/resetIp');
            const data = await (0, rxjs_1.lastValueFrom)(api);
            console.log(222, data);
        }
        catch (error) { }
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleRemovmessageseMessage", null);
__decorate([
    (0, schedule_1.Cron)('0 */1 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "resetIp", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
    }),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map