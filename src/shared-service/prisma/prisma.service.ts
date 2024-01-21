import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { ApiConfigService } from '../env/api-config.service';
import { createPrismaExtension } from './extensions/prisma.extension';

@Injectable()
export class PrismaService
        extends PrismaClient<PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'>
        implements OnModuleInit, OnModuleDestroy
{
        private _prisma: ReturnType<typeof createPrismaExtension>;
        private logger: Logger = new Logger(PrismaService.name);

        constructor(config: ApiConfigService) {
                super({
                        datasources: {
                                db: {
                                        url: config.dbConfig.url,
                                },
                        },
                        log: [
                                {
                                        emit: 'event',
                                        level: 'query',
                                },
                                'info',
                                'warn',
                                {
                                        emit: 'event',
                                        level: 'error',
                                },
                        ],
                });
                this.setupPrismaExtension();
        }

        get extended() {
                if (!this._prisma) {
                        this._prisma = createPrismaExtension(this);
                        return this._prisma;
                }

                return this._prisma;
        }

        private setupPrismaExtension() {
                this._prisma = createPrismaExtension(this);
        }

        async onModuleInit() {
                await this.$connect();
                this.logger.log('DB connection established');

                this.$on('query', async (e) => {
                        this.logger.log('Query: ' + e.query);
                        this.logger.log('Params: ' + e.params);
                        this.logger.log('Duration: ' + e.duration + 'ms\n');
                });

                this.$on('error', async (e) => {
                        this.logger.error(e);
                });
        }

        async onModuleDestroy() {
                await this.$disconnect();
                this.logger.log('DB connection closed');
        }
}
