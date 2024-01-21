import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '@/common/decorators';

import { EmailService } from './email.service';

// NOTE : Email 전송 테스트 용도
@ApiTags('Mail')
@Controller('mail')
export class EmailController {
        private userEmail = 'test@example.com';
        constructor(private readonly emailService: EmailService) {}

        @Post('send/welcome')
        @PublicRoute()
        welcome() {
                this.emailService.sendWelcomeEmail(this.userEmail);
        }

        @Post('send/verify-email')
        @PublicRoute()
        verifyEmail() {
                this.emailService.sendVerifyEmail(this.userEmail);
        }

        @Post('send/reset-password')
        @PublicRoute()
        resetPassword() {
                this.emailService.sendResetPasswordEmail(this.userEmail);
        }
}
