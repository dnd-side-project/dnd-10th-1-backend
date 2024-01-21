import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
        HealthCheck,
        HealthCheckResult,
        HealthCheckService,
        PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PublicRoute } from '@/common/decorators';

import { PrismaService } from '@/shared-service/prisma';

@ApiTags('HealthCheck')
@Controller('health-check')
export class HealthCheckController {
        constructor(
                private healthCheckService: HealthCheckService,
                private prismaOrmIndicator: PrismaHealthIndicator,
                private prismaService: PrismaService,
        ) {}

        @Get()
        @PublicRoute()
        @HealthCheck()
        async check(): Promise<HealthCheckResult> {
                return this.healthCheckService.check([
                        () => this.prismaOrmIndicator.pingCheck('database', this.prismaService),
                ]);
        }
}
