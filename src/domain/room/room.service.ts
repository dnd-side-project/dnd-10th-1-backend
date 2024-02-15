import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from '../user/user.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RoomService {
        constructor(
                private readonly prismaService: PrismaService,
                private readonly userService: UserService,
        ) {}

        async createRoom(ownerId: number) {
                const newRoom = await this.prismaService.room.create({
                        data: {
                                id: randomUUID(),
                                createdAt: new Date(),
                                updatedAt: new Date(),
                        },
                });

                console.log('newRoom', newRoom);
                await this.userService.updatePermission({
                        userId: ownerId,
                        roomId: newRoom.id,
                        role: Role.Owner,
                });

                return newRoom.id;
        }
}
