import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
        constructor(private readonly prismaService: PrismaService) {}

        async findOneById(id: number) {
                const userInfo = await this.prismaService.user.findUnique({
                        select: {
                                id: true,
                                displayName: true,
                                profileImage: true,
                                role: true,
                                status: true,
                        },
                        where: { id },
                });
                return userInfo;
        }

        async updatePermission(data: { userId: number; roomId: string; role: Role }) {
                const { userId, roomId } = data;

                const _updateUserPermission = await this.prismaService.user.update({
                        data: {
                                role: Role.Owner,
                                roomId: roomId,
                        },
                        where: {
                                id: userId,
                        },
                });

                return;
        }

        async updateMbti(data: { userId: number; mbti: string }) {
                const { userId, mbti } = data;

                const _updateUserMbti = await this.prismaService.user.update({
                        where: {
                                id: Number(userId),
                        },
                        data: {
                                mbti,
                        },
                });

                return;
        }

        async countMbtiByRoomId(roomId: string) {
                const userMbtiNullCount = await this.prismaService.user.count({
                        where: { roomId, mbti: null },
                });
                console.log(userMbtiNullCount);

                return userMbtiNullCount;
        }
}
