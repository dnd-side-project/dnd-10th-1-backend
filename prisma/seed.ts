/* eslint-disable @typescript-eslint/no-unused-vars */
// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient({
        datasources: { db: { url: process.env.DATABASE_SEED_PUSH_MIGRATE_URL } },
});

async function main() {
        const room = await prisma.room.create({
                data: {
                        id: 'DNNV215SV',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                },
        });
        const invite = await prisma.invite.create({
                data: {
                        id: 1,
                        createdAt: new Date(),
                        url: 'https://example.com',
                        roomId: 'DNNV215SV',
                },
        });
        const user = await prisma.user.createMany({
                data: [
                        {
                                id: 1,
                                displayName: 'Jack',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ISTJ',
                                roomId: 'DNNV215SV',
                        },
                        {
                                id: 2,
                                displayName: 'John',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ISFJ',
                                roomId: 'DNNV215SV',
                        },
                        {
                                id: 3,
                                displayName: 'Noah',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ISFP',
                                roomId: 'DNNV215SV',
                        },
                        {
                                id: 4,
                                displayName: 'Stella',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ENFP',
                                roomId: 'DNNV215SV',
                        },
                        {
                                id: 5,
                                displayName: 'Ethan',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ENFJ',
                                roomId: 'DNNV215SV',
                        },
                        {
                                id: 6,
                                displayName: 'Olivia',
                                profileImage: 'https://naver.com',
                                role: Role.Owner,
                                mbti: 'ENTP',
                                roomId: 'DNNV215SV',
                        },
                ],
        });
        const game_category = await prisma.gameCategory.createMany({
                data: [
                        { id: 1, gameTitle: '빈칸주제' },
                        { id: 2, gameTitle: 'MBTI 게임' },
                ],
        });
        const game_blank_topic = await prisma.gameBlankTopic.createMany({
                data: [
                        {
                                id: 1,
                                description: '지하철에서 만난 빌런은 ____ 이다.',
                                gameCategoryId: 1,
                        },
                ],
        });
        const game_round = await prisma.gameRound.create({
                data: {
                        roomId: 'DNNV215SV',
                        gameBlankTopicId: 1,
                },
        });
        const blank_topic_result = await prisma.blankTopicResult.createMany({
                data: [
                        {
                                id: 1,
                                answer: '단소 빌런',
                                gameBlankTopicId: 1,
                                userId: 1,
                                gameRoundId: 1,
                        },
                        {
                                id: 2,
                                answer: '트로트 신사',
                                gameBlankTopicId: 1,
                                userId: 2,
                                gameRoundId: 1,
                        },
                        {
                                id: 3,
                                answer: '자르반 할아버지',
                                gameBlankTopicId: 1,
                                userId: 3,
                                gameRoundId: 1,
                        },
                        {
                                id: 4,
                                answer: '미스터 초밥왕',
                                gameBlankTopicId: 1,
                                userId: 4,
                                gameRoundId: 1,
                        },
                        {
                                id: 5,
                                answer: '태권도 할아버지',
                                gameBlankTopicId: 1,
                                userId: 5,
                                gameRoundId: 1,
                        },
                        {
                                id: 6,
                                answer: '스파이더맨',
                                gameBlankTopicId: 1,
                                userId: 6,
                                gameRoundId: 1,
                        },
                ],
        });

        const game_mbti = await prisma.gameMbti.createMany({
                data: [
                        {
                                id: 1,
                                mbti: 'ISTJ',
                                mbtiNickname: '신중한 검토자',
                                description: '신중한 검토자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 2,
                                mbti: 'ISFJ',
                                mbtiNickname: '용감한 수호자',
                                description: '용감한 수호자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 3,
                                mbti: 'INFJ',
                                mbtiNickname: '예언자',
                                description: '예언자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 4,
                                mbti: 'INTJ',
                                mbtiNickname: '용의주도한 전략가',
                                description: '용의주도한 전략가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 5,
                                mbti: 'ISTP',
                                mbtiNickname: '만능 재주꾼',
                                description: '만능 재주꾼는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 6,
                                mbti: 'ISFP',
                                mbtiNickname: '호기심 많은 예술가',
                                description: '호기심 많은 예술가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 7,
                                mbti: 'INFP',
                                mbtiNickname: '열정적인 중재자',
                                description: '열정적인 중재자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 8,
                                mbti: 'INTP',
                                mbtiNickname: '논리적인 사색가',
                                description: '논리적인 사색가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 9,
                                mbti: 'ESTP',
                                mbtiNickname: '모험을 즐기는 사업가',
                                description: '모험을 즐기는 사업가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 10,
                                mbti: 'ESFP',
                                mbtiNickname: '자유로운 영혼의 연예인',
                                description: '자유로운 영혼의 연예인는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 11,
                                mbti: 'ENFP',
                                mbtiNickname: '재기발랄한 활동가',
                                description: '재기발랄한 활동가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 12,
                                mbti: 'ENTP',
                                mbtiNickname: '기민한 변론가',
                                description: '기민한 변론가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 13,
                                mbti: 'ESTJ',
                                mbtiNickname: '엄격한 관리자',
                                description: '엄격한 관리자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 14,
                                mbti: 'ESFJ',
                                mbtiNickname: '사교적인 외교관',
                                description: '사교적인 외교관는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 15,
                                mbti: 'ENFJ',
                                mbtiNickname: '정의로운 사회운동가',
                                description: '정의로운 사회운동가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 16,
                                mbti: 'ENTJ',
                                mbtiNickname: '대담한 통솔자',
                                description: '대담한 통솔자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '우리팀은 알잘딱깔센 팀',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                ],
        });
        const mbtiMatching = await prisma.mbtiMatching.createMany({
                data: [
                        { id: 1, matchingMbti: 'ESFP ', gameMbtiId: 1 }, // ISTJ
                        { id: 2, matchingMbti: 'ISTP ', gameMbtiId: 1 }, // ISTJ
                        { id: 3, matchingMbti: 'ESFP ', gameMbtiId: 2 }, // ISFJ
                        { id: 4, matchingMbti: 'ESTP ', gameMbtiId: 2 }, // ISFJ
                        { id: 5, matchingMbti: 'ENFP ', gameMbtiId: 3 }, // INFJ
                        { id: 6, matchingMbti: 'ENTP ', gameMbtiId: 3 }, // INFJ
                        { id: 7, matchingMbti: 'ENFP ', gameMbtiId: 4 }, // INTJ 1개만 존재
                        { id: 8, matchingMbti: 'ESFJ ', gameMbtiId: 5 }, // ISTP
                        { id: 9, matchingMbti: 'ESTJ ', gameMbtiId: 5 }, // ISTP
                        { id: 10, matchingMbti: 'ESFJ ', gameMbtiId: 6 }, // ISFP
                        { id: 11, matchingMbti: 'ESTJ ', gameMbtiId: 6 }, // ISFP
                        { id: 12, matchingMbti: 'ENFJ ', gameMbtiId: 7 }, // INFP
                        { id: 13, matchingMbti: 'ENTJ ', gameMbtiId: 7 }, // INFP
                        { id: 14, matchingMbti: 'ENFJ ', gameMbtiId: 8 }, // INTP
                        { id: 15, matchingMbti: 'ENTJ ', gameMbtiId: 8 }, // INTP
                        { id: 16, matchingMbti: 'ISFJ ', gameMbtiId: 9 }, // ESTP
                        { id: 17, matchingMbti: 'ISTJ ', gameMbtiId: 9 }, // ESTP
                        { id: 18, matchingMbti: 'ISFJ ', gameMbtiId: 10 }, // ESFP
                        { id: 19, matchingMbti: 'ISTJ ', gameMbtiId: 10 }, // ESFP
                        { id: 20, matchingMbti: 'INFJ ', gameMbtiId: 11 }, // ENFP
                        { id: 21, matchingMbti: 'INTJ ', gameMbtiId: 11 }, // ENFP
                        { id: 22, matchingMbti: 'INFJ ', gameMbtiId: 12 }, // ENTP
                        { id: 23, matchingMbti: 'INTJ ', gameMbtiId: 12 }, // ENTP
                        { id: 24, matchingMbti: 'ISFP ', gameMbtiId: 13 }, // ESTJ
                        { id: 25, matchingMbti: 'ISTP ', gameMbtiId: 13 }, // ESTJ
                        { id: 26, matchingMbti: 'ISFP ', gameMbtiId: 14 }, // ESFJ
                        { id: 27, matchingMbti: 'ISTP ', gameMbtiId: 14 }, // ESFJ
                        { id: 28, matchingMbti: 'INTP ', gameMbtiId: 15 }, // ENFJ
                        { id: 29, matchingMbti: 'INFP ', gameMbtiId: 15 }, // ENFJ
                        { id: 30, matchingMbti: 'INTP ', gameMbtiId: 16 }, // ENTJ
                        { id: 31, matchingMbti: 'INFP ', gameMbtiId: 16 }, // ENTJ
                ],
        });
}

// execute the main function
main()
        .catch((e) => {
                console.error(e);
                process.exit(1);
        })
        .finally(async () => {
                // close Prisma Client at the end
                await prisma.$disconnect();
        });
