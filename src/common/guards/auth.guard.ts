import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY } from '@/common/decorators';

import { ApiConfigService } from '@/shared-service/env';

@Injectable()
export class AuthGuard implements CanActivate {
        constructor(
                private jwtService: JwtService,
                private configService: ApiConfigService,
                private reflector: Reflector,
        ) {}

        private extractTokenFromHeader(request: Request): string | undefined {
                const [type, token] = request.headers.authorization?.split(' ') ?? [];
                return type === 'Bearer' ? token : undefined;
        }

        private extractTokenFromCookie(request: Request): string | undefined {
                const token = request.cookies.token;
                return token ? token : undefined;
        }

        async canActivate(context: ExecutionContext): Promise<boolean> {
                const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                        context.getHandler(),
                        context.getClass(),
                ]);

                if (isPublic) {
                        return true;
                }

                const request = context.switchToHttp().getRequest();
                const token = this.extractTokenFromHeader(request);

                if (!token) {
                        throw new UnauthorizedException();
                }

                try {
                        const payload = await this.jwtService.verifyAsync(token, {
                                secret: this.configService.authConfig.privateKey,
                        });

                        request['user'] = payload;
                } catch {
                        throw new UnauthorizedException();
                }
                return true;
        }
}
