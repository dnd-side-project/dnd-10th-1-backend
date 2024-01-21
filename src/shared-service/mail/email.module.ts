import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailSenderService } from './email.service';

@Module({
        imports: [
                MailerModule.forRootAsync({
                        inject: [ConfigService],
                        useFactory: (configService: ConfigService) => ({
                                transport: {
                                        host: configService.get('SMTP_SENDER_HOST'),
                                        port: 587,
                                        // ignoreTLS: '',
                                        secure: false,
                                        auth: {
                                                user: configService.get('SMTP_AUTH_USER'),
                                                pass: configService.get('SMTP_AUTH_PASSWORD'),
                                        },
                                },
                                defaults: {
                                        from: configService.get('SMTP_SENDER_EMAIL'),
                                },
                                // preview: true,  // 이메일 미리보기
                                template: {
                                        dir: __dirname + '/templates/pages',
                                        adapter: new HandlebarsAdapter(),
                                        options: {
                                                strict: true,
                                        },
                                },
                                options: {
                                        partials: {
                                                dir: __dirname + '/templates/partials',
                                                options: {
                                                        strict: true,
                                                },
                                        },
                                        layouts: {
                                                dir: __dirname + '/templates/layouts',
                                                options: {
                                                        strict: true,
                                                },
                                        },
                                },
                        }),
                }),
        ],
        providers: [EmailSenderService],
        exports: [EmailSenderService],
})
export class EmailModule {}
