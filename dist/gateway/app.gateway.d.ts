import { HttpService } from '@nestjs/axios';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Queue } from 'bull';
import { Server, Socket } from 'socket.io';
interface Message {
    name: string;
    postId: string;
    content: string;
    created_at?: Date;
    userId?: string;
    startNavigator?: any;
    location?: any;
}
interface IClientSocketUser {
    phone: string;
    socketId: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly httpService;
    private socketQueue;
    constructor(httpService: HttpService, socketQueue: Queue);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleRemovmessageseMessage(client: Socket, payload: Message): Promise<void>;
    postMessage(payload: Message): void;
    addUser(user: IClientSocketUser): void;
    removeUser(socketId: string): void;
}
export {};
