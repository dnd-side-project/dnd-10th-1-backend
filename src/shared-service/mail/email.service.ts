import { MailerService } from '@nestjs-modules/mailer';

import { Injectable } from '@nestjs/common';

import { Subject, Template } from './templates/types/email.type';

@Injectable()
export class EmailSenderService {
        constructor(private readonly mailerService: MailerService) {}

        async verifyEmail(userEmail) {
                this.mailerService.sendMail({
                        to: userEmail,
                        subject: Subject.VERIFY,
                        template: Template.VERIFY,
                        context: {
                                email: userEmail,
                        },
                });
        }

        async resetPassword({
                userEmail,
                newPassword,
        }: {
                userEmail: string;
                newPassword: string;
        }) {
                await this.mailerService.sendMail({
                        to: userEmail,
                        subject: Subject.RESET,
                        template: Template.RESET,
                        context: {
                                password: newPassword,
                        },
                });
        }

        async welcome(userEmail) {
                await this.mailerService.sendMail({
                        to: userEmail,
                        subject: Subject.WELCOME,
                        template: Template.WELCOME,
                });
        }
}
