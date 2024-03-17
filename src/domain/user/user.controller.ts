import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @ApiOperation({
                summary: '사용자 프로필 설정 API',
                description: '사용자의 프로필 이미지와 닉네임을 입력 받아 저장합니다.',
        })
        @ApiResponse({
                status: 200,
                description: '사용자 프로필 저장 성공',
        })
        @Post()
        async setUserProfile(@Body() userDto: UserDto, @Query() data: { roomId: string }) {
                const { roomId } = data;
                const { nickName, profileImage } = userDto;

                if (roomId) {
                        return await this.userService.setUserProfile(
                                nickName,
                                profileImage,
                                roomId,
                        );
                }
                return await this.userService.setUserProfile(nickName, profileImage, '');
        }
}
