import { Observable, map } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class undefinedToNullInterceptor {
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
                return next.handle().pipe(map((data) => (data === undefined ? null : data)));
        }
}
