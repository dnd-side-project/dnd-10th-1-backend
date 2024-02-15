import { Module } from '@nestjs/common';
import { GameMbtiController } from './game-mbti.controller';
import { GameMbtiService } from './game-mbti.service';

@Module({
        providers: [GameMbtiService],
        controllers: [GameMbtiController],
        exports: [GameMbtiService],
})
export class GameMbtiModule {}
