import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '@/common/decorators';

import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService, private userService: UserService) {}

        @Post('login')
        @PublicRoute()
        @HttpCode(HttpStatus.OK)
        signIn(@Body() signInDto: SignInDto) {
                const { username, password } = signInDto;
                return this.authService.signIn(username, password);
        }

        @Get('profile')
        @HttpCode(HttpStatus.OK)
        @ApiBearerAuth()
        getProfile(@Request() req) {
                return req.user;
        }

        @Post('register')
        @PublicRoute()
        create(
                @Body()
                createUserDto: CreateUserDto,
        ) {
                return this.userService.signUp(createUserDto);
        }
}
