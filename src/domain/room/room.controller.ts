import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('/room')
export class RoomController {
        constructor(private roomService: RoomService) {}

        @Get('check')
        async checkRoomExist(@Query() data: { roomId: string }) {
                const { roomId } = data;
                const isRoomExist = await this.roomService.checkRoomExist(roomId);
                return {
                        success: isRoomExist,
                };
        }
}
