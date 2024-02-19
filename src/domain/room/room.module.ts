import { Module } from '@nestjs/common';

import { RoomEventsGateway } from './room.gateway';
import { RoomService } from './room.service';
import { UserService } from '../user/user.service';

@Module({
        controllers: [],
        providers: [RoomEventsGateway, RoomService, UserService],
        exports: [RoomEventsGateway, RoomService],
})
export class RoomModule {}
