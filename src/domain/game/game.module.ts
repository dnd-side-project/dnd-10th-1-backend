import { GameService } from './game.service';
import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Module({
        controllers: [],
        providers: [GameService, UserService],
        exports: [GameService],
})
export class GameModule {}
