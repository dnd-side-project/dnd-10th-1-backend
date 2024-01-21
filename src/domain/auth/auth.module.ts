import { UserService } from 'domain/user/user.service';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
        imports: [
                UserModule,
                JwtModule.registerAsync({
                        global: true,
                        useFactory: (configService: ConfigService) => ({
                                secret: configService.get('JWT_PRIVATE_KEY'),
                                signOptions: {
                                        expiresIn: configService.get('JWT_EXPIRATION_TIME'),
                                },
                        }),
                        inject: [ConfigService],
                }),
        ],
        providers: [AuthService, UserService],
        controllers: [AuthController],
        exports: [AuthService],
})
export class AuthModule {}
