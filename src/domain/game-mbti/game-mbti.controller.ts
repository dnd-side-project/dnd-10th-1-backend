import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { GameMbtiService } from './game-mbti.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserMbtiDto } from './dto/user-mbti.dto';

@ApiTags('MBTI API')
@Controller('game/mbti/')
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
}
