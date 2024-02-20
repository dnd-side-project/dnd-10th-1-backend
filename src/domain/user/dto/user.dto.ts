import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
        @ApiProperty({
                example: 'John',
                description: '사용자의 닉네임',
                required: true,
        })
        @IsString()
        nickName: string;

        @ApiProperty({
                example: 'https://naver.com',
                description: '사용자의 프로필 이미지 url',
                required: true,
        })
        @IsString()
        profileImage: string;
}
