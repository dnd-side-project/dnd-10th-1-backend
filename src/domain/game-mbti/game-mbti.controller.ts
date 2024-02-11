import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { GameMbtiService } from './game-mbti.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserMbtiDto } from './dto/user.mbti.dto';
import { MbtiResultDto } from './dto/mbti.result.dto';

@ApiTags('MBTI API')
@Controller('game/mbti')
export class GameMbtiController {
        constructor(private readonly gameMbtiService: GameMbtiService) {}

        @ApiOperation({
                summary: 'MBTI 목록 조회하기 API',
                description: '16가지 MBTI 리스트를 불러옵니다.',
        })
        @ApiResponse({
                status: 200,
                description: '16가지 MBTI 조회 성공',
        })
        @Get()
        async getMbtiList(@Res() res: Response) {
                const mbtiList = await this.gameMbtiService.getMbtiList();

                return res.status(HttpStatus.OK).json(mbtiList);
        }

        @ApiOperation({
                summary: 'MBTI 입력받기 API',
                description: '사용자의 MBTI를 입력 받습니다.',
        })
        @ApiResponse({
                status: 200,
                description: '사용자의 MBTI 입력 받아오기 성공',
        })
        @Post()
        UpdateUserMbti(@Body() UserMbtiDto: UserMbtiDto) {
                const { mbti, userId } = UserMbtiDto;
                return this.gameMbtiService.UpdateUserMbti(userId, mbti);
        }

        @ApiOperation({
                summary: 'MBTI 결과 조회하기 API',
                description:
                        '사용자의 MBTI에 따른 개인 결과, 팀 조합 결과, 팀원 결과 목록 데이터를 조회합니다.',
        })
        @ApiResponse({
                status: 200,
                description: '사용자에 따른 MBTI 결과 데이터 조회하기 성공',
        })
        @Get('/result')
        async getMbtiResult(@Query() MbtiResultDto: MbtiResultDto, @Res() res: Response) {
                const { userId, roomId } = MbtiResultDto;
                const { user, userMbtiResult } =
                        await this.gameMbtiService.getUserMbtiResult(userId);
                const { members, teamMbtiResult } =
                        await this.gameMbtiService.getTeamResult(roomId);

                res.status(HttpStatus.OK).json({
                        data: {
                                user,
                                userMbtiResult,
                                teamMbtiResult,
                                members,
                        },
                });
        }
}
