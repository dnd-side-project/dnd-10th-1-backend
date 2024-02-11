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
                const mbtiNickname = await this.prismaService.gameMbti.findUnique({
                        select: { mbtiNickname: true },
                        where: { mbti: mbti },
                });
                const updateUser = await this.prismaService.user.update({
                        where: { id: userId },
                        data: { mbti: mbti, mbtiNickname: mbtiNickname.mbtiNickname },
                });

                return updateUser;
        }

        async getUserMbti(userId: number) {
                const mbti = await this.prismaService.user.findUnique({
                        select: { mbti: true },
                        where: { id: userId },
                });

                return mbti.mbti;
        }

        async getUserMbtiResult(userId: number) {
                const userMbti = await this.getUserMbti(userId);
                const result = await this.prismaService.gameMbti.findUnique({
                        select: { mbtiNickname: true, description: true },
                        where: { mbti: userMbti },
                });
                return result;
        }

        setTeamMbti(teamMbtiList: string[]): string {
                let count: Record<string, number> = {};
                let result = '';

                for (let i = 0; i < 4; i++) {
                        for (var mbti of teamMbtiList) {
                                count[mbti[i]] = (count[mbti[i]] || 0) + 1;
                        }
                }

                const keys = Object.keys(count);
                for (let i = 0; i < keys.length - 1; i += 2) {
                        if (count[keys[i]] >= count[keys[i + 1]]) {
                                result += keys[i];
                        } else {
                                result += keys[i + 1];
                        }
                }

                return result;
        }

        async getTeamResult(roomId: string) {
                const members = await this.prismaService.user.findMany({
                        select: { id: true, mbti: true, mbtiNickname: true },
                        where: { roomId: roomId },
                });
                const mbtiList = members.map((value) => value.mbti);
                const teamMbti = this.setTeamMbti(mbtiList);
                const teamMbtiResult = await this.prismaService.gameMbti.findUnique({
                        select: { teamMbti: true },
                        where: { mbti: teamMbti },
                });

                return {
                        members,
                        teamMbtiResult,
                };
        }
}
