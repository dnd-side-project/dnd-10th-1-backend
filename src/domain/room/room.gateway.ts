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
                                status: userInfo.status,
                        },
                ];

                this.server.to(roomId).emit(RoomEvent.LISTEN_ROOM_USER_LIST, { userList, roomId });
                client.emit(RoomEvent.MOVE_TO_WAITING_ROOM);
        }

        // 방 참여
        @SubscribeMessage(RoomEvent.JOIN_ROOM)
        async onJoinRoom(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; userId: number },
        ) {
                const { roomId, userId } = data;
                const isRoomExist = await this.roomService.checkRoomExist(roomId);

                if (!isRoomExist) return { message: '방이 존재하지 않습니다.' };

                client.join(roomId);

                const _userJoinRoom = await this.roomService.joinRoom({
                        userId,
                        roomId,
                });

                const userList = await this.roomService.findUsersByRoomId(roomId);

                this.server.to(roomId).emit(RoomEvent.LISTEN_ROOM_USER_LIST, { userList, roomId });
                client.emit(RoomEvent.MOVE_TO_WAITING_ROOM);
        }

        // 대기실
        @SubscribeMessage(RoomEvent.UPDATE_STATUS)
        async onUpdateStatus(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { userId: number; status: string; roomId: string },
        ) {
                const { roomId, userId, status } = data;

                const _updateUserRoomStatus = await this.userService.updateUserRoomStatus({
                        userId,
                        status,
                });

                const userList = await this.roomService.findUsersByRoomId(roomId);

                this.server.to(roomId).emit(RoomEvent.LISTEN_ROOM_USER_LIST, { userList, roomId });
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
