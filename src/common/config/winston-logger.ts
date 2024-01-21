import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { isProd } from '@/common/utils';

export const winstonTransportConsoleOption = new winston.transports.Console({
        level: isProd ? 'info' : 'silly',
        format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike(process.env.SERVICE_NAME, {
                        colors: true,
                        prettyPrint: true,
                }),
        ),
});

export const winstonTransportFileOption = ({ type }: { type: 'error' | 'info' }) => {
        const logDir = 'logs';

        return new winston.transports.File({
                level: type,
                dirname: path.join(`./${logDir}/${type}`),
                filename: `%DATE%.${type}.log`,
                maxFiles: 30,
                zippedArchive: true,
                format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(process.env.SERVICE_NAME, {
                                colors: true,
                                prettyPrint: true,
                        }),
                ),
        });
};

export const winstonTransportRotateFileOption = ({ type }: { type: 'error' | 'info' }) => {
        const logDir = 'logs';

        return new winston.transports.DailyRotateFile({
                level: type,
                dirname: path.join(`./${logDir}/${type}`),
                filename: `%DATE%.${type}.log`,
                maxFiles: 30,
                zippedArchive: true,
                format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(process.env.SERVICE_NAME, {
                                colors: true,
                                prettyPrint: true,
                        }),
                ),
        });
};
