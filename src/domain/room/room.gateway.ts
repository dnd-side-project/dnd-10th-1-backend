import { Server, Socket } from 'socket.io';

import {
        ConnectedSocket,
        MessageBody,
        OnGatewayConnection,
        OnGatewayDisconnect,
        OnGatewayInit,
        SubscribeMessage,
        WebSocketGateway,
        WebSocketServer,
} from '@nestjs/websockets';

import { RoomEvent } from './types/events';
import { RoomService } from './room.service';
import { UserService } from '../user/user.service';

@WebSocketGateway({
        namespace: '/room',
        cors: {
                origin: '*',
        },
})
export class RoomEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        public server: Server;

        constructor(
                private roomService: RoomService,
                private userService: UserService,
        ) {}

        // 방 개설
        @SubscribeMessage(RoomEvent.CREATE_ROOM)
        async onCreateRoom(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { userId: number },
        ) {
                const { userId } = data;

                const roomId = await this.roomService.createRoom(userId);
                client.join(roomId);

                const userInfo = await this.userService.findOneById(userId);
                const userList = [
                        {
                                userId: userInfo.id,
                                displayName: userInfo.displayName,
                                profileImage: userInfo.profileImage,
                                permission: userInfo.role,
                                status: 'ready', // 'waiting' | 'ready'
                        },
                ];

                this.server.to(roomId).emit(RoomEvent.LISTEN_ROOM_USER_LIST, userList);
                client.emit(RoomEvent.MOVE_TO_WAITING_ROOM);
        }

        afterInit() {
                console.log('connected');
        }

        handleConnection(client: Socket) {
                console.log(`Connected : ${client.id} ${client.nsp.name}`);
        }

        handleDisconnect(client: Socket) {
                console.log(`Disconnected : ${client.id} ${client.nsp.name}`);
        }
}
