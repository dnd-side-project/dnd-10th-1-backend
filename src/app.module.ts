import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingInterceptor } from '@/common/interceptors';

import { HealthCheckModule } from '@/domain/health-check/health.module';

import { SharedServiceModule } from '@/shared-service/shared-service.module';
import { GameMbtiModule } from './domain/game-mbti/game-mbti.module';
import { RoomModule } from './domain/room/room.module';
import { UserModule } from './domain/user/user.module';
import { GameModule } from './domain/game/game.module';

@Module({
        imports: [
                HealthCheckModule,
                SharedServiceModule,
                RoomModule,
                GameMbtiModule,
                UserModule,
                GameModule,
        ],
        controllers: [],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: LoggingInterceptor,
                },
                Logger,
        ],
})
export class AppModule {}
