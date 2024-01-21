import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard, RolesGuard } from '@/common/guards';
import { RoleEnum } from '@/common/interfaces';

export function Auth(...roles: RoleEnum[]) {
        return applyDecorators(
                SetMetadata('roles', roles),
                UseGuards(AuthGuard, RolesGuard),
                ApiBearerAuth(),
                ApiUnauthorizedResponse({
                        description: 'Unauthorized',
                }),
        );
}
