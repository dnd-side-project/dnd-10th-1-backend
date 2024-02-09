import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GameMbtiService } from './game-mbti.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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
        @Get('/list')
        async getMbtiList(@Res() res: Response) {
                const mbtiList = await this.gameMbtiService.getMbtiList();

                return res.status(HttpStatus.OK).json(mbtiList);
        }
}
