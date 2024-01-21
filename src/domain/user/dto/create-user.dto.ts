import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
        @ApiProperty({
                example: 'TestUser',
                description: '사용자명',
        })
        @IsNotEmpty()
        @IsString()
        username: string;

        @ApiProperty({
                example: 'qwer1234',
                description: '비밀번호',
        })
        @IsNotEmpty()
        @IsString()
        password: string;

        @ApiProperty({
                example: 'test@gmail.com',
                description: '이메일',
        })
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email: string;
}
