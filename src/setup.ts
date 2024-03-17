import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import path from 'path';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
        Swagger,
        winstonTransportConsoleOption,
        winstonTransportRotateFileOption,
} from '@/common/config';
import { printBootBanner, printEnvBanner } from '@/common/utils';

import { ApiConfigService } from '@/shared-service/env';
import { SharedServiceModule } from '@/shared-service/shared-service.module';

import { AppModule } from './app.module';

export class ExpressServer {
        app: NestExpressApplication;
        config: ApiConfigService;
        swagger: Swagger;

        private buildPipe() {
                this.app.useGlobalPipes(
                        new ValidationPipe({
                                whitelist: true,
                                forbidNonWhitelisted: true,
                                transform: true,
                                // disableErrorMessages: true,
                        }),
                );
        }

        private buildMiddleware() {
                this.app.use(helmet());
                this.app.enableCors();
                this.app.use(cookieParser());
                this.app.useStaticAssets(path.join(__dirname, '..', 'public'));
                this.app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
                this.app.setViewEngine('hbs');
        }

        private buildDocument() {
                this.swagger.initialize();
        }

        public async setup() {
                this.app = await NestFactory.create<NestExpressApplication>(AppModule, {
                        cors: true,
                        // custom logger 전역 설정
                        logger: WinstonModule.createLogger({
                                transports: [
                                        winstonTransportConsoleOption,
                                        winstonTransportRotateFileOption({
                                                type: 'info',
                                        }),
                                        winstonTransportRotateFileOption({
                                                type: 'error',
                                        }),
                                ],
                        }),
                });
                this.config = this.app.select(SharedServiceModule).get(ApiConfigService);
                this.swagger = new Swagger(this.app);

                this.app.enableVersioning({
                        type: VersioningType.URI,
                        prefix: 'v',
                        defaultVersion: '1',
                });
                this.app.setGlobalPrefix('api');
                this.app.enableShutdownHooks();

                this.buildMiddleware();
                this.buildPipe();
                this.buildDocument();
        }

        public async start() {
                await this.app.listen(this.config.appConfig.port, () => {
                        printBootBanner();

                        const isProd = this.config.isProduction;
                        if (!isProd) printEnvBanner(this.config);
                });
        }
}
