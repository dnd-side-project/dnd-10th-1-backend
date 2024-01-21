import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './api-config.service';
import { EnvironmentVariablesValidator } from './envValidator';

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        envFilePath: `.env.${process.env.NODE_ENV}`,
                        validationSchema: EnvironmentVariablesValidator,
                }),
        ],
        providers: [ApiConfigService],
        exports: [ApiConfigService],
})
export class EnvModule {}
