import { RedisModule } from '@liaoliaots/nestjs-redis';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';

@Module({
        imports: [
                RedisModule.forRootAsync({
                        imports: [ConfigModule],
                        useFactory: async (configService: ConfigService) => ({
                                config: {
                                        host: configService.get('REDIS_HOST'),
                                        port: configService.get('REDIS_PORT'),
                                        // username: configService.get('REDIS_USERNAME'),
                                        // password: configService.get('REDIS_PASSWORD'),
                                },
                                readyLog: true,
                                errorLog: true,
                        }),
                        inject: [ConfigService],
                }),
        ],
        providers: [RedisService],
        exports: [RedisService],
})
export class MyRedisModule {}
