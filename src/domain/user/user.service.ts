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
}
