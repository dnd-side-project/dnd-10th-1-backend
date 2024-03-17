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

        async updateUserMbti(userId: number, mbti: string) {
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
                const user = await this.prismaService.user.findUnique({
                        select: { displayName: true, profileImage: true },
                        where: { id: userId },
                });
                const userMbtiResult = await this.prismaService.gameMbti.findUnique({
                        select: { mbtiNickname: true, description: true },
                        where: { mbti: userMbti },
                });
                return {
                        user,
                        userMbtiResult,
                };
        }

        async generateTeamMbti(teamMbtiList: string[]): Promise<string> {
                const mbtiCounts: Record<string, number> = {
                        E: 0,
                        I: 0,
                        S: 0,
                        N: 0,
                        T: 0,
                        F: 0,
                        J: 0,
                        P: 0,
                };
                let teamMbti = '';

                // mbti 각 자리별 카운팅
                teamMbtiList.forEach((mbti) => {
                        mbti.split('').forEach((letter) => {
                                mbtiCounts[letter]++;
                        });
                });

                const keys = Object.keys(mbtiCounts);

                // E/I, S/N, T/F, J/P 각 자리별 카운팅 비교
                for (let i = 0; i < keys.length - 1; i += 2) {
                        const currentMbti = keys[i];
                        const nextMbti = keys[i + 1];

                        // 각 자리별 높은 빈도수의 MBTI 설정
                        teamMbti +=
                                mbtiCounts[currentMbti] >= mbtiCounts[nextMbti]
                                        ? currentMbti
                                        : nextMbti;
                }

                return teamMbti;
        }

        async getTeamResult(roomId: string) {
                const members = await this.prismaService.user.findMany({
                        select: { id: true, mbti: true, mbtiNickname: true, profileImage: true },
                        where: { roomId: roomId },
                });
                const mbtiList = members.map((value) => value.mbti);
                const teamMbti = await this.generateTeamMbti(mbtiList);
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
