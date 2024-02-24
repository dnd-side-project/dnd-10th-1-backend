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
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';
import { RoomEvent } from '../room/types/events';
import { RoomService } from '../room/room.service';

@WebSocketGateway({
        namespace: '/',
        cors: {
                origin: '*',
        },
})
export class GameEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        public server: Server;

        constructor(
                private userService: UserService,
                private roomService: RoomService,
                private gameService: GameService,
        ) {}

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
        @SubscribeMessage(GameEvent.START_GAME)
        async onStartGame(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; gameId: number },
        ) {
                const { roomId, gameId } = data;
                const userList = await this.roomService.findUsersByRoomId(roomId);
                const totalCount = userList.length;

                // 빈칸주제 게임 데이터
                if (gameId === 1) {
                        // 빈칸주제 데이터 9개 한정 랜덤 뽑기
                        const randomNum = generateRandomNumber(9);

                        const _createGameRound = await this.gameService.createGameBlankTopicRound({
                                roomId,
                                topicId: randomNum,
                        });
                        const blankTopic = await this.gameService.findOneBlankTopic(randomNum);
                        const gameInfo = {
                                totalCount,
                                ...blankTopic,
                        };
                        this.server.to(roomId).emit(GameEvent.MOVE_TO_GAME, {
                                gameId,
                                gameInfo,
                        });
                }
                // MBTI 게임
                else if (gameId == 2) {
                        const gameInfo = {
                                totalCount,
                        };
                        this.server.to(roomId).emit(GameEvent.MOVE_TO_GAME, {
                                gameId,
                                gameInfo,
                        });
                }
        }

        // game - 게임 종료
        @SubscribeMessage(GameEvent.END_GAME)
        async onEndGame(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; userId: number },
        ) {
                const { roomId, userId } = data;
                const { role: userRole } = await this.userService.findOneById(userId);
                const roomUserList = await this.roomService.findUsersByRoomId(roomId);
                const roomUserIdList = roomUserList.map((user) => user.id);

                // 방장이 나간 경우 방 폭파
                if (Role.Owner === userRole) {
                        const _updateUsersRoomStatus = await this.userService.updateUsersRoomStatus(
                                {
                                        userId: roomUserIdList,
                                        status: RoomEvent.EXIT,
                                },
                        );

                        this.server.to(roomId).emit(RoomEvent.LEAVE_ALL_USER_FROM_ROOM);
                        this.server.in(roomId).socketsLeave(roomId);

                        return;
                }

                // 참여자가 나간 경우

                const _updateUserRoomStatus = await this.userService.updateUserRoomStatus({
                        userId: userId,
                        status: RoomEvent.EXIT,
                });

                const userList = roomUserList.filter((user) => user.id != userId);

                this.server.to(roomId).emit(RoomEvent.LISTEN_ROOM_USER_LIST, { userList, roomId });

                client.leave(roomId);
        }

        // game[mbti] - 사용자 mbti 선택
        @SubscribeMessage(GameEvent.SELECT_MBTI)
        async onSelectMbti(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; userId: number; mbti: string },
        ) {
                const { roomId, userId, mbti } = data;

                const _updateUserMbti = await this.userService.updateMbti({ userId, mbti });
                const mbtiNullCount = await this.userService.countMbtiByRoomId(roomId);

                // 유저별 로딩 페이지 이동
                client.emit(GameEvent.MOVE_TO_MBTI_LOADING);

                // 모든 유저 제출 완료시 결과 이벤트 전송
                if (mbtiNullCount === 0) {
                        this.server.to(roomId).emit(GameEvent.MOVE_TO_MBTI_RESULT);
                        return;
                }
        }

        // game[빈칸주제] - 게임시작
        @SubscribeMessage(GameEvent.SEND_USER_ANSWER)
        async onSendUserAnswer(
                @ConnectedSocket() client: Socket,
                @MessageBody()
                data: {
                        roomId: string;
                        topicId: number;
                        userId: number;
                        answer: string;
                },
        ) {
                const { roomId, topicId, userId, answer } = data;

                const gameRoundId = await this.gameService.findCurrentGameRound({
                        roomId,
                        topicId,
                });

                const _createUserAnswer = await this.gameService.createBlankTopicUserAnswer({
                        topicId,
                        userId,
                        gameRoundId,
                        answer,
                });

                const { answerCount, totalCount } = await this.gameService.countBlankTopicAnswer({
                        roomId,
                        gameRoundId,
                });

                this.server.to(roomId).emit(GameEvent.LISTEN_LIVE_USER_COUNT, {
                        answerCount,
                        totalCount,
                });

                if (answerCount >= totalCount) {
                        this.server.to(roomId).emit(GameEvent.MOVE_TO_BLANK_TOPIC_RESULT);
                }
        }

        // game[빈칸주제] - 결과조회
        @SubscribeMessage(GameEvent.GET_USERS_ANSWER)
        async onGetUsersAnswer(
                @ConnectedSocket() client: Socket,
                @MessageBody() data: { roomId: string; topicId: number },
        ) {
                const { roomId, topicId } = data;
                const gameRoundId = await this.gameService.findCurrentGameRound({
                        roomId,
                        topicId,
                });

                const userAnswerList = await this.gameService.findAllBlankTopicUserAnswer({
                        roomId,
                        gameRoundId,
                });

                this.server.to(roomId).emit(GameEvent.GET_USERS_ANSWER, userAnswerList);
        }

        // 빈칸주제 랜덤결과 조회
        @SubscribeMessage(GameEvent.GET_SMALL_TALK_RANDOM_ANSWER)
        async onGetSmallTalkRandomAnswer(
                @MessageBody() data: { userAnswerList: string[]; topicId: number; roomId: string },
        ) {
                const { userAnswerList, topicId, roomId } = data;
                // const userIds = userAnswerList.map((user) => user.userId);
                // const randomIndex = Math.floor(Math.random() * userIds.length);
                // const randomUserId = userIds[randomIndex];

                const randomIndex = Math.floor(Math.random() * userAnswerList.length);
                const randomUserId = Number(userAnswerList[randomIndex]);
                const { displayName, profileImage } =
                        await this.userService.findOneById(randomUserId);
                const selectAnswer =
                        await this.gameService.findAllBlankTopicOneUserAnswer(randomUserId);
                const topic = await this.gameService.findOneBlankTopic(topicId);

                const selectInfo = {
                        userInfo: {
                                nickName: displayName,
                                profileImage,
                        },
                        selectAnswer,
                        topic,
                };

                this.server.to(roomId).emit(GameEvent.GET_SMALL_TALK_RANDOM_ANSWER, selectInfo);
                this.server.to(roomId).emit(GameEvent.MOVE_TO_BLANK_TOPIC_RESULT);
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
