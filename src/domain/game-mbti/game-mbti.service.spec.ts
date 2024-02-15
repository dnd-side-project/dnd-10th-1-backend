import { Test, TestingModule } from '@nestjs/testing';
import { GameMbtiService } from './game-mbti.service';

describe('GameMbtiService', () => {
  let service: GameMbtiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameMbtiService],
    }).compile();

    service = module.get<GameMbtiService>(GameMbtiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
