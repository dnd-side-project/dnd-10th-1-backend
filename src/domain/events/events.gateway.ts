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

@WebSocketGateway({ namespace: /\/ws-.+/ })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        public server: Server;
        private rooms: Map<string, Set<string>> = new Map();

        @SubscribeMessage('test')
        handleMessage(@MessageBody() data: string) {
                console.log(data);
        }

        // 방 개설
        @SubscribeMessage('createRoom')
        handleCreateRoom(@ConnectedSocket() client: Socket, data: { room: string }) {
                // Create room if it doesn't exist
                if (!this.rooms.has(data.room)) {
                        this.rooms.set(data.room, new Set());
                }

                // Join the room
                client.join(data.room);
                this.addUserToRoom(client.id, data.room);

                // Emit event to notify room creation
                // to(data.room).emit('createdRoom') => data.room 방에 있는 모든 사람들에게 createdRoom 메시지 전달
                // to() : 누구에게 전송할 것인지
                // emit() : 어떤 메시지를 전송할 것인지
                this.server.to(data.room).emit('createdRoom', `${client.id} created ${data.room}`);
                this.server.emit('roomList', Array.from(this.rooms.keys()));
        }

        // 방 참여
        @SubscribeMessage('joinRoom')
        joinRoom(
                @ConnectedSocket() client: Socket,
                @MessageBody()
                data: {
                        id: number;
                        room: string[];
                },
        ) {
                // client.join();
        }

        // 방 나가기
        @SubscribeMessage('exitRoom')
        exitRoom(@ConnectedSocket() client: Socket) {
                // client.leave();
        }

        afterInit(server: Socket) {
                console.log('Init');
        }

        handleConnection(client: Socket) {
                console.log('Connected');
        }

        handleDisconnect(client: Socket) {
                console.log('Disconnected');
        }

        private addUserToRoom(userId: string, room: string) {
                if (this.rooms.has(room)) {
                        const users = this.rooms.get(room);
                        users.add(userId);
                }
        }
}
