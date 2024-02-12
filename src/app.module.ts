import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingInterceptor } from '@/common/interceptors';

import { EventsModule } from '@/domain/events/events.module';
import { HealthCheckModule } from '@/domain/health-check/health.module';

import { SharedServiceModule } from '@/shared-service/shared-service.module';
import { GameMbtiModule } from './domain/game-mbti/game-mbti.module';
import { GameMbtiService } from './domain/game-mbti/game-mbti.service';

@Module({
        imports: [HealthCheckModule, SharedServiceModule, EventsModule, GameMbtiModule],
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
