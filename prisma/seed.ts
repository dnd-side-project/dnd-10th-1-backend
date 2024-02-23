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
                        { id: 3, gameTitle: '룰렛 게임' },
                ],
        });
        const game_blank_topic = await prisma.gameBlankTopic.createMany({
                data: [
                        {
                                id: 1,
                                description: '지하철에서 만난 최고 빌런은',
                                gameCategoryId: 1,
                        },
                        {
                                id: 2,
                                description: '제일 재밌게 본 영화는',
                                gameCategoryId: 1,
                        },
                        {
                                id: 3,
                                description: '내가 갔던 최고의 여행지는',
                                gameCategoryId: 1,
                        },
                        {
                                id: 4,
                                description: '내가 가장 좋아하는 음악장르는',
                                gameCategoryId: 1,
                        },
                        {
                                id: 5,
                                description: '내가 가장 좋아하는 옷 스타일은',
                                gameCategoryId: 1,
                        },
                        {
                                id: 6,
                                description: '좋아하는 책 장르는',
                                gameCategoryId: 1,
                        },
                        {
                                id: 7,
                                description: '좋아하는 어벤져스 캐릭터는',
                                gameCategoryId: 1,
                        },
                        {
                                id: 8,
                                description: '넷플릭스 최애 프로그램은',
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
                                mbtiNickname: '매의 눈 사감 선생님',
                                description: '신중한 검토자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '엑셀러레이터',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 2,
                                mbti: 'ISFJ',
                                mbtiNickname: '전지적 참견시점 매니저',
                                description: '용감한 수호자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: 'EQ 천재 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 3,
                                mbti: 'INFJ',
                                mbtiNickname: '샤이한 조력자',
                                description: '예언자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '알잘딱깔센 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 4,
                                mbti: 'INTJ',
                                mbtiNickname: '철두철미한 셰르파',
                                description: '용의주도한 전략가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '브레인 스토머스 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 5,
                                mbti: 'ISTP',
                                mbtiNickname: '겉바속촉 문제 해결사',
                                description: '만능 재주꾼는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '만능 일잘러 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 6,
                                mbti: 'ISFP',
                                mbtiNickname: '다양한 시각을 가진 힐러',
                                description: '호기심 많은 예술가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '오케스트라 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 7,
                                mbti: 'INFP',
                                mbtiNickname: '말랑 뽀짝한 중재자',
                                description: '열정적인 중재자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '융통성 맥스 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 8,
                                mbti: 'INTP',
                                mbtiNickname: '전략에 강한 만년 1등',
                                description: '논리적인 사색가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '세계 탐험가 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 9,
                                mbti: 'ESTP',
                                mbtiNickname: '끝내주는 해결사',
                                description: '모험을 즐기는 사업가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '유니콘 스타트업 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 10,
                                mbti: 'ESFP',
                                mbtiNickname: '정신적 지주',
                                description: '자유로운 영혼의 연예인는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '유토피아 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 11,
                                mbti: 'ENFP',
                                mbtiNickname: '핵인싸 협업 메이트',
                                description: '재기발랄한 활동가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '아이디어 뱅크 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 12,
                                mbti: 'ENTP',
                                mbtiNickname: '반박시 니말이 맞음',
                                description: '기민한 변론가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '에너자이저 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 13,
                                mbti: 'ESTJ',
                                mbtiNickname: '만능 스케줄러',
                                description: '엄격한 관리자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '불꽃 카리스마 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 14,
                                mbti: 'ESFJ',
                                mbtiNickname: '빛과 소금같은 존재',
                                description: '사교적인 외교관는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '유재석 분신술 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 15,
                                mbti: 'ENFJ',
                                mbtiNickname: '마더 테레사',
                                description: '정의로운 사회운동가는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '이노베이션 조합',
                                mbtiImage: 'https://naver.com',
                                teamMbtiImage: 'https://naver.com',
                                gameCategoryId: 2,
                        },
                        {
                                id: 16,
                                mbti: 'ENTJ',
                                mbtiNickname: '확신의 리더상',
                                description: '대담한 통솔자는 ~ 한 상황에서 ~ 합니다.',
                                teamMbti: '어벤져스 조합',
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
        const game_topic_gacha = await prisma.gameTopicGacha.createMany({
                data: [
                        { id: 1, description: '어떤 음식을 제일 좋아하나요?', gameCategoryId: 3 },
                        {
                                id: 2,
                                description: '어떤 영화를 제일 재밌게 봤나요?',
                                gameCategoryId: 3,
                        },
                        { id: 3, description: '내가 좋아하는 음악 장르는?', gameCategoryId: 3 },
                        { id: 4, description: '산 vs 바다', gameCategoryId: 3 },
                        { id: 5, description: '탕수육 찍먹 vs 부먹', gameCategoryId: 3 },
                        { id: 6, description: '평생 여름 vs 겨울', gameCategoryId: 3 },
                        { id: 7, description: '단톡방 고백 vs 길거리 고백', gameCategoryId: 3 },
                        { id: 8, description: '월 200 백수 vs 월 500 직장인', gameCategoryId: 3 },
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
