import { Module } from '@nestjs/common';

import { RoomEventsGateway } from './room.gateway';
import { RoomService } from './room.service';
import { UserService } from '../user/user.service';
import { RoomController } from './room.controller';

@Module({
        controllers: [RoomController],
        providers: [RoomEventsGateway, RoomService, UserService],
        exports: [RoomEventsGateway, RoomService],
})
export class RoomModule {}
