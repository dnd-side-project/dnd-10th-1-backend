import { isNil } from 'lodash';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
        constructor(private configService: ConfigService) {}

        get isDevelopment(): boolean {
                return this.nodeEnv === 'development';
        }

        get isProduction(): boolean {
                return this.nodeEnv === 'production';
        }

        get isTest(): boolean {
                return this.nodeEnv === 'test';
        }

        private getNumber(key: string): number {
                const value = this.get(key);

                try {
                        return Number(value);
                } catch {
                        throw new Error(key + ' environment variable is not a number');
                }
        }

        private getBoolean(key: string): boolean {
                const value = this.get(key);

                try {
                        return Boolean(JSON.parse(value));
                } catch {
                        throw new Error(key + ' env var is not a boolean');
                }
        }

        private getString(key: string): string {
                const value = this.get(key);

                if (isNil(value)) {
                        process.on('exit', () => {
                                console.error(key + ' environment variable does not set');
                        });

                        // throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
                }

                return value.replace(/\\n/g, '\n');
        }

        get nodeEnv(): string {
                return this.getString('NODE_ENV');
        }

        get awsConfig() {
                return {
                        bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
                        bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
                        bucketName: this.getString('AWS_S3_BUCKET_NAME'),
                        accessKey: this.getString('AWS_S3_ACCESS_KEY'),
                        secretAccessKey: this.getString('AWS_S3_SECRET_ACCESS_KEY'),
                };
        }

        get authConfig() {
                return {
                        privateKey: this.getString('JWT_PRIVATE_KEY'),
                        publicKey: this.getString('JWT_PUBLIC_KEY'),
                        jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
                };
        }

        get appConfig() {
                const host = this.getString('HOST');
                const port = this.getString('PORT');
                const url = `${host}:${port}`;

                return {
                        host,
                        port,
                        url,
                };
        }

        get dbConfig() {
                return {
                        url: this.getString('DATABASE_URL'),
                        host: this.getString('DATABASE_HOST'),
                };
        }

        get facebookConfig() {
                return {
                        clientId: this.getString('OAUTH_FACEBOOK_APP_ID'),
                        callbackUrl: this.getString('OAUTH_FACEBOOK_CALLBACK_URL'),
                        clientSecret: this.getString('OAUTH_FACEBOOK_SECRET'),
                };
        }

        get googleConfig() {
                return {
                        clientId: this.getString('OAUTH_GOOGLE_APP_ID'),
                        callbackUrl: this.getString('OAUTH_GOOGLE_CALLBACK_URL'),
                        clientSecret: this.getString('OAUTH_GOOGLE_SECRET'),
                };
        }

        get kakaoConfig() {
                return {
                        clientId: this.getString('OAUTH_KAKAO_APP_ID'),
                        callbackUrl: this.getString('OAUTH_KAKAO_CALLBACK_URL'),
                        clientSecret: this.getString('OAUTH_KAKAO_SECRET'),
                };
        }

        private get(key: string): string {
                const value = this.configService.get<string>(key);

                if (isNil(value)) {
                        process.on('exit', () => {
                                console.error(key + ' environment variable does not set');
                        });

                        // throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
                }

                return value;
        }
}
