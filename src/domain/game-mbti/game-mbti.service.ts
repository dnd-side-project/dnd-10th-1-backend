import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameMbtiService {
        constructor(private readonly prismaService: PrismaService) {}
        async getMbtiList() {
                const mbtiList = await this.prismaService.gameMbti.findMany({
                        select: { mbti: true },
                });

                return mbtiList.map((value) => value.mbti);
        }

        async UpdateUserMbti(userId: number, mbti: string) {
                const updateUser = await this.prismaService.user.update({
                        where: { id: userId },
                        data: { mbti: mbti },
                });

                return updateUser.mbti;
        }
}
