import { HttpService } from '@nestjs/axios';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface Message {
    name: string;
    postId: string;
    content: string;
    created_at?: Date;
    userId?: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly httpService;
    constructor(httpService: HttpService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleRemovmessageseMessage(client: Socket, payload: Message): Promise<void>;
}
export {};
