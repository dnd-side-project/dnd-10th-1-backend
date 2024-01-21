// nestjs service.ts
import { Injectable } from '@nestjs/common';

import { EmailSenderService } from '@/shared-service/mail/email.service';

@Injectable()
export class EmailService {
        constructor(private readonly emailSenderService: EmailSenderService) {}

        async sendWelcomeEmail(email: string) {
                this.emailSenderService.welcome(email);
        }

        async sendVerifyEmail(email: string) {
                this.emailSenderService.verifyEmail(email);
        }

        async sendResetPasswordEmail(email: string) {
                this.emailSenderService.resetPassword({
                        userEmail: email,
                        newPassword: '새로운 패스워드 입니다.',
                });
        }
}
