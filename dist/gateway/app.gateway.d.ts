import { HttpService } from '@nestjs/axios';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DistanceService } from 'src/distance/distance.service';
interface Message {
    name: string;
    postId: string;
    content: string;
    created_at?: Date;
    userId?: string;
    startNavigator?: any;
}
interface IClientSocketUser {
    phone: string;
    socketId: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly httpService;
    private readonly distanceService;
    constructor(httpService: HttpService, distanceService: DistanceService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleRemovmessageseMessage(client: Socket, payload: Message): Promise<void>;
    addUser(user: IClientSocketUser): void;
    removeUser(socketId: string): void;
}
export {};
