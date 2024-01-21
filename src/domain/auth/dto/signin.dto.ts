import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
        @ApiProperty({
                example: 'John',
                description: '사용자명',
        })
        @IsNotEmpty()
        @IsString()
        username: string;

        @ApiProperty({
                example: 'password',
                description: '비밀번호',
        })
        @IsNotEmpty()
        @IsString()
        password: string;
}
