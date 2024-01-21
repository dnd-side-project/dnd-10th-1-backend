import { Logger, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthGuard } from '@/common/guards';
import { LoggingInterceptor } from '@/common/interceptors';

import { AuthModule } from '@/domain/auth/auth.module';
import { EmailModule } from '@/domain/email/email.module';
import { EventsModule } from '@/domain/events/events.module';
import { HealthCheckModule } from '@/domain/health-check/health.module';
import { UserModule } from '@/domain/user/user.module';

import { SharedServiceModule } from '@/shared-service/shared-service.module';

@Module({
        imports: [
                AuthModule,
                UserModule,
                HealthCheckModule,
                EmailModule,
                SharedServiceModule,
                EventsModule,
        ],
        controllers: [],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: LoggingInterceptor,
                },
                {
                        provide: APP_GUARD,
                        useClass: AuthGuard,
                },
                Logger,
        ],
})
export class AppModule {}
