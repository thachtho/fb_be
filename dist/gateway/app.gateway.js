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
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const location_1 = require("../libs/utils/location");
const Post_1 = require("../static/Post");
const UserOnline_1 = require("../static/UserOnline");
let AppGateway = class AppGateway {
    constructor(httpService) {
        this.httpService = httpService;
    }
    afterInit(server) {
        console.log('Socket.IO server initialized');
    }
    async handleConnection(client) {
        const phone = client.handshake?.query?.phone;
        if (phone) {
            this.addUser({ phone, socketId: client.id });
        }
    }
    handleDisconnect(client) {
        console.log('Ngat ket noi!.', client.id);
        this.removeUser(client.id);
    }
    async handleRemovmessageseMessage(client, payload) {
        let posts = Post_1.Post.posts;
        const check = posts.find((item) => item.postId === payload.postId);
        if (!check) {
            if (posts.length === 20) {
                posts.pop();
            }
            if (payload.name === 'Người tham gia ẩn danh') {
                payload.name = '[Ẩn danh - Nguy Hiểm]';
            }
            const address = (0, location_1.getAddress)(payload.content);
            console.log(11, address);
            posts.unshift({
                ...payload,
            });
            void this.server.emit('postMessage', payload);
        }
        else {
            if (payload?.startNavigator) {
                check.startNavigator = payload.startNavigator;
            }
            if (payload.content.length > 0) {
                check.content = payload.content;
            }
            if (payload?.name && payload.name.length > 0) {
                check.name = payload?.name;
            }
            posts = [...posts];
        }
    }
    addUser(user) {
        const users = UserOnline_1.UsersOnline.usersOnline;
        const { phone, socketId } = user;
        !users.some((user) => user.phone.toString() === phone.toString()) &&
            users.push({ phone: phone.toString(), socketId });
    }
    removeUser(socketId) {
        let users = UserOnline_1.UsersOnline.usersOnline;
        UserOnline_1.UsersOnline.usersOnline = [...users.filter((user) => user.socketId !== socketId)];
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
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
    }),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map