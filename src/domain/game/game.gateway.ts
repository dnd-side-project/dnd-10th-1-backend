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
import { GameEvent } from '../room/types/events';
import console from 'console';

@WebSocketGateway({
        namespace: '/game',
        cors: {
                origin: '*',
        },
})
export class GameEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        public server: Server;

        constructor() {}
        // game - 게임 종류 선택
        @SubscribeMessage(GameEvent.SELECT_GAME)
        async onSelectGame(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // game - 게임 종료
        @SubscribeMessage(GameEvent.END_GAME)
        async onEndGame(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // game[mbti] - 사용자 mbti 선택
        @SubscribeMessage(GameEvent.SELECT_MBTI)
        async onSelectMbti(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // game[빈칸주제] - 게임시작
        @SubscribeMessage(GameEvent.SEND_USER_ANSWER)
        async onSendUserAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // game[빈칸주제] - 결과조회
        @SubscribeMessage(GameEvent.GET_USERS_ANSWER)
        async onGetUsersAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

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
