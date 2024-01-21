import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GoogleApiService } from './http-google.service';

@Module({
        imports: [
                HttpModule.registerAsync({
                        imports: [ConfigModule],
                        useFactory: async (configService: ConfigService) => ({
                                timeout: configService.get('HTTP_TIMEOUT'),
                                maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
                        }),
                        inject: [ConfigService],
                }),
        ],
        providers: [GoogleApiService],
        exports: [GoogleApiService],
})
export class MyHttpModule {}
