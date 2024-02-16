import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class GameService {
        constructor(
                private readonly prismaService: PrismaService,
                private readonly userService: UserService,
        ) {}

        async findAllGameInfo() {
                const gameList = await this.prismaService.gameCategory.findMany({
                        select: {
                                id: true,
                                gameTitle: true,
                        },
                });
                return gameList;
        }
}
