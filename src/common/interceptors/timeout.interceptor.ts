import { Observable, TimeoutError, catchError, throwError, timeout } from 'rxjs';

import {
        CallHandler,
        ExecutionContext,
        Injectable,
        NestInterceptor,
        RequestTimeoutException,
} from '@nestjs/common';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
                return next.handle().pipe(
                        timeout(1000),
                        catchError((err) => {
                                if (err instanceof TimeoutError) {
                                        return throwError(() => new RequestTimeoutException());
                                }
                                return throwError(() => new Error(err));
                        }),
                );
        }
}
