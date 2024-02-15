import { Test, TestingModule } from '@nestjs/testing';
import { GameMbtiController } from './game-mbti.controller';

describe('GameMbtiController', () => {
  let controller: GameMbtiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameMbtiController],
    }).compile();

    controller = module.get<GameMbtiController>(GameMbtiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
