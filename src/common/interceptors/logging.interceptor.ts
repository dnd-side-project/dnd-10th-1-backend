import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
        CallHandler,
        ExecutionContext,
        HttpException,
        HttpStatus,
        Injectable,
        Logger,
        NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
        private request: Request;
        private response: Response;

        private logger: Logger = new Logger('HTTP');

        /**
         * request 로그 출력
         */
        private loggingRequest() {
                const { originalUrl, method, params, query, body, headers } = this.request;
                const { host, 'user-agent': userAgent } = headers;
                const reqLoggingFormat = {
                        type: '📭 Request',
                        'timestamp (ISO)': new Date().toISOString(),
                        'timestamp (KO)': new Date().toLocaleString(),
                        host,
                        userAgent,
                        path: originalUrl,
                        method,
                        params,
                        query,
                        body,
                };

                this.logger.log(reqLoggingFormat);
        }

        /**
         * response 로그 출력
         */
        private loggingResponse(data: any) {
                const { statusCode } = this.response;

                const resLoggingFormat = {
                        type: '📬 Response',
                        'timestamp (ISO)': new Date().toISOString(),
                        'timestamp (KO)': new Date().toLocaleString(),
                        statusCode,
                        data,
                };

                this.logger.log(resLoggingFormat);
        }

        /**
         * error 로그 출력
         * @param error Error Object
         */
        private loggingErrResponse(error: Error) {
                const statusCode =
                        error instanceof HttpException
                                ? error.getStatus()
                                : HttpStatus.INTERNAL_SERVER_ERROR;
                const message =
                        error instanceof HttpException ? error.message : 'Internal server error';

                const { url, method } = this.request;

                const errFormat = {
                        'timestamp (ISO)': new Date().toISOString(),
                        'timestamp (KO)': new Date().toLocaleString(), // 에러 발생 시간
                        statusCode, // 에러 코드
                        path: url, // url 경로
                        method, // http method 정보
                        message, // 에러 메시지
                        exceptionStack: error.stack,
                };

                this.logger.error(errFormat);
        }

        /**
         * 사용자 요청 전/후 실행
         * @param context Interface describing details about the current request pipeline.
         * @param next Interface providing access to the response stream.
         */
        public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
                const ctx = context.switchToHttp();
                this.request = ctx.getRequest<Request>();
                this.response = ctx.getResponse<Response>();

                this.loggingRequest();

                return next.handle().pipe(
                        tap({
                                next: (value) => {
                                        this.loggingResponse(value);
                                },
                                error: (err: Error) => {
                                        this.loggingErrResponse(err);
                                },
                        }),
                );
        }
}
