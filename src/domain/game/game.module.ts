import { GameService } from './game.service';
import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { GameEventsGateway } from './game.gateway';

@Module({
        controllers: [],
        providers: [GameService, UserService, GameEventsGateway],
        exports: [GameService],
})
export class GameModule {}
