import { Module } from '@nestjs/common';
import { GameMbtiController } from './game-mbti.controller';

@Module({
  controllers: [GameMbtiController]
})
export class GameMbtiModule {}
