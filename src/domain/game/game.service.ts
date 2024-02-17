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
                answer: string;
        }) {
                const { userId, topicId, answer } = data;
                console.log('createBlankTopicUserAnswer: 동작함');
                return await this.prismaService.blankTopicResult.create({
                        data: {
                                userId,
                                gameBlankTopicId: topicId,
                                answer,
                        },
                });
        }

        async countBlankTopicAnswer(roomId: string) {
                const answerCountList = await this.prismaService.user.findMany({
                        select: {
                                _count: {
                                        select: {
                                                BlankTopicResult: true,
                                        },
                                },
                        },
                        where: {
                                roomId,
                        },
                });
                const answerCount = answerCountList[0]._count.BlankTopicResult;

                const roomUsers = await this.prismaService.user.count({
                        where: {
                                roomId,
                        },
                });

                const unanswerCount = roomUsers - answerCount;

                return { answerCount, unanswerCount };
        }
}
