import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateUserMbtiDto {
        @ApiProperty({
                example: 'ESTJ',
                description: 'user의 mbti',
                required: true,
        })
        @IsString()
        mbti: string;

        @ApiProperty({
                example: 1,
                description: 'user의 id',
                required: true,
        })
        @IsInt()
        userId: number;
}
