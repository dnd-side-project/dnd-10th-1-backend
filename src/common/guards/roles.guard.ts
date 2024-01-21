import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
        constructor(private readonly reflector: Reflector) {}

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
                const roles = this.reflector.get<string[]>('roles', context.getHandler());
                if (!roles) {
                        return true;
                }
                const request = context.switchToHttp().getRequest();
                const user = request.user;
                return this.matchRoles(roles, user.roles);
        }

        matchRoles(roles: string[], role: string) {
                return roles.includes(role);
        }
}
