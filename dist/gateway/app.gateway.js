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
const event_emitter_1 = require("@nestjs/event-emitter");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const Post_1 = require("../static/Post");
const UserOnline_1 = require("../static/UserOnline");
let AppGateway = class AppGateway {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    afterInit(server) {
        console.log('Socket.IO server initialized');
    }
    async handleConnection(client) {
        console.log('Connection!');
        const phone = client.handshake?.query?.phone;
        if (phone) {
            console.log('Connection!');
            return this.addUser({ phone, socketId: client.id });
        }
        console.log('ko tim thay phone');
        return client.disconnect();
    }
    handleDisconnect(client) {
        console.log('Ngat ket noi!.', client.id);
        this.removeUser(client.id);
    }
    async handleRemovmessageseMessage(client, payload) {
        console.log(222, payload);
        payload.content = payload.content.replace('PHIÊN BẢN G_O.J_O TRÊN MÁY BẠN ĐÃ CŨ. BẤM RELOAD ĐỂ CẬP NHẬT PHIÊN BẢN MỚI NHÉ', '');
        let posts = Post_1.Post.posts;
        const check = posts.find((item) => item.postId === payload.postId);
        if (!check) {
            if (posts.length === 20) {
                posts.pop();
            }
            if (payload.name === 'Anonymous participant' || payload.name === 'Người tham gia ẩn danh') {
                payload.name = '[Ẩn danh - Nguy Hiểm]';
            }
            posts.unshift({
                ...payload,
            });
            void this.eventEmitter.emit('post.created', payload);
        }
    }
    postMessage(payload) {
        let posts = Post_1.Post.posts;
        const currentPost = posts.find(item => item.postId === payload.postId);
        if (currentPost) {
            currentPost.locationStart = payload.locationStart;
            currentPost.locationEnd = payload.locationEnd;
            currentPost.time = payload?.time;
            currentPost.distanceAB = payload?.distanceAB;
            currentPost.fileName = payload?.fileName;
        }
        void this.server.emit('postMessage', payload);
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
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map