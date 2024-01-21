import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export function AuthUser() {
        return createParamDecorator((_data: unknown, context: ExecutionContext) => {
                const request = context.switchToHttp().getRequest();
                const user = request.user; // process : auth.guard -> request.user

                // PublicRoute 예외처리
                if (user?.[Symbol.for('isPublic')]) {
                        return;
                }

                return user.sub;
        })();
}
