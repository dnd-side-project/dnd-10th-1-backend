import { PrismaService } from '@/shared-service/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameMbtiService {
        constructor(private readonly prisma: PrismaService) {}
        async getMbtiList() {
                const mbtiList = await this.prisma.gameMbti.findMany({
                        select: { mbti: true },
                });

                return mbtiList.map((value) => value.mbti);
        }
}
