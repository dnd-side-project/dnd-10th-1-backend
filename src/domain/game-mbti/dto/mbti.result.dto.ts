import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class MbtiResultDto {
        @ApiProperty({
                example: 1,
                description: 'user의 id',
                required: true,
        })
        @IsInt()
        @Type(() => Number)
        userId: number;

        @ApiProperty({
                example: 'DNNV215SV',
                description: '참여하고 있는 방의 코드',
                required: true,
        })
        @IsString()
        roomId: string;
}
