import { EventEmitter2 } from '@nestjs/event-emitter';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export interface Message {
    name: string;
    postId: string;
    content: string;
    created_at?: Date;
    userId?: string;
    locationStart?: any;
    locationEnd?: any;
    distanceAB?: number | null;
    time?: any;
}
interface IClientSocketUser {
    phone: string;
    socketId: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void | Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>>;
    handleDisconnect(client: Socket): void;
    handleRemovmessageseMessage(client: Socket, payload: Message): Promise<void>;
    postMessage(payload: Message): void;
    addUser(user: IClientSocketUser): void;
    removeUser(socketId: string): void;
}
export {};
