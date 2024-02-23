import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class GameService {
        constructor(
                private readonly prismaService: PrismaService,
                private readonly userService: UserService,
        ) {}

        async findAllGameCategory() {
                const gameList = await this.prismaService.gameCategory.findMany({
                        select: {
                                id: true,
                                gameTitle: true,
                        },
                });
                return gameList;
        }

        async findOneBlankTopic(blankTopicId: number) {
                const gameInfo = await this.prismaService.gameBlankTopic.findUnique({
                        select: {
                                id: true,
                                description: true,
                        },
                        where: {
                                id: blankTopicId,
                        },
                });

                return gameInfo;
        }

        async createBlankTopicUserAnswer(data: {
                userId: number;
                topicId: number;
                gameRoundId: number;
                answer: string;
        }) {
                const { userId, topicId, gameRoundId, answer } = data;
                return await this.prismaService.blankTopicResult.create({
                        data: {
                                userId,
                                gameBlankTopicId: topicId,
                                gameRoundId,
                                answer,
                        },
                });
        }

        async countBlankTopicAnswer(data: { roomId: string; gameRoundId: number }) {
                const { roomId, gameRoundId } = data;

                const userIdList = await this.prismaService.user.findMany({
                        select: { id: true },
                        where: {
                                roomId,
                        },
                });

                const userIds = userIdList.map((user) => user.id);

                const answerList = await this.prismaService.blankTopicResult.findMany({
                        select: {
                                id: true,
                                answer: true,
                        },
                        where: {
                                userId: {
                                        in: userIds,
                                },
                                gameRoundId,
                        },
                });

                const totalUserCount = await this.prismaService.user.count({
                        where: {
                                roomId,
                        },
                });

                return { answerCount: answerList.length, totalCount: totalUserCount };
        }
        async findAllBlankTopicUserAnswer(data: { roomId: string; gameRoundId: number }) {
                const { roomId, gameRoundId } = data;
                const userAnswerList = await this.prismaService.blankTopicResult.findMany({
                        select: {
                                userId: true,
                                answer: true,
                        },
                        where: {
                                user: {
                                        roomId,
                                },
                                gameRoundId,
                        },
                });

                return userAnswerList;
        }
        async createGameBlankTopicRound(data: { roomId: string; topicId: number }) {
                const { roomId, topicId } = data;
                const _createGameRound = await this.prismaService.gameRound.create({
                        data: {
                                roomId,
                                gameBlankTopicId: topicId,
                        },
                });
                return;
        }

        async findCurrentGameRound(data: { roomId: string; topicId: number }) {
                const { roomId, topicId } = data;
                const gameRound = await this.prismaService.gameRound.findFirst({
                        where: {
                                roomId,
                                gameBlankTopicId: topicId,
                        },
                        orderBy: {
                                createdAt: 'desc',
                        },
                });

                return gameRound.id;
        }
}
