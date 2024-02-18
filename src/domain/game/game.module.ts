import { GameService } from './game.service';
import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { GameEventsGateway } from './game.gateway';
import { RoomService } from '../room/room.service';

@Module({
        controllers: [],
        providers: [GameService, UserService, RoomService, GameEventsGateway],
        exports: [GameService],
})
export class GameModule {}
