import { GameService } from './game.service';
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
import { GameEvent } from './types/events';
import console from 'console';
import { generateRandomNumber } from '@/common/utils';

@WebSocketGateway({
        namespace: '/game',
        cors: {
                origin: '*',
        },
})
export class GameEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        public server: Server;

        constructor(private gameService: GameService) {}

        // game - 게임 종류 조회하기
        @SubscribeMessage(GameEvent.SELECT_GAME)
        async onSelectGame(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string },
        ) {
                const { roomId } = data;
                const gameCategory = await this.gameService.findAllGameCategory();

                client.emit(GameEvent.GET_GAME_CATEGORY, gameCategory);
                this.server.to(roomId).emit(GameEvent.MOVE_TO_LOADING_ROOM);
        }

        // // game - 게임 시작
        // NOTE : 빈칸주제 게임인 경우만 사용
        @SubscribeMessage(GameEvent.START_GAME)
        async onStartGame(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; gameId: number },
        ) {
                const { roomId, gameId: _gamdId } = data;

                // 빈칸주제 데이터 9개 한정
                const randomNum = generateRandomNumber(9);
                const gameInfo = await this.gameService.findOneBlankTopic(randomNum);

                this.server.to(roomId).emit(GameEvent.GET_GAME_ITEM, gameInfo);
                this.server.to(roomId).emit(GameEvent.MOVE_TO_GAME);
        }

        // // game - 게임 종료
        // @SubscribeMessage(GameEvent.END_GAME)
        // async onEndGame(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // // game[mbti] - 사용자 mbti 선택
        // @SubscribeMessage(GameEvent.SELECT_MBTI)
        // async onSelectMbti(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        //         // TODO: 사용자의 mbti 정보 저장
        //         // await this.prismaService.user.update({
        //         //      data: { mbti: data.mbti, },
        //         //     where: {
        //         //         id: data.userId,
        //         //      }
        //         // })

        //         // TODO: roomID 으로 필터링하여 user.mbti 가 null 인 경우 조회. 0 이면 mbti 결과 화면으로 이동
        //         // this.server.to(roomId).emit(GameEvent.MOVE_TO_LOADING_ROOM);

        //         // TODO: 로딩 페이지 이동
        //         client.emit(GameEvent.MOVE_TO_LOADING_ROOM);
        // }

        // // game[빈칸주제] - 게임시작
        // @SubscribeMessage(GameEvent.SEND_USER_ANSWER)
        // async onSendUserAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

        // // game[빈칸주제] - 결과조회
        // @SubscribeMessage(GameEvent.GET_USERS_ANSWER)
        // async onGetUsersAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {}

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
