import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
        @ApiProperty({
                example: 'TestUser',
                description: '사용자명',
        })
        @IsNotEmpty()
        @IsString()
        username: string;

        @ApiProperty({
                example: 'test@gmail.com',
                description: '이메일',
        })
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email: string;
}
