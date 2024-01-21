import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validatePassword } from '@/common/utils/bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
        constructor(private usersService: UserService, private jwtService: JwtService) {}

        async signIn(username, password) {
                const user = await this.usersService.findOne({
                        username,
                });
                const isValidPassword = validatePassword(user?.password, password);

                if (!isValidPassword) {
                        throw new UnauthorizedException();
                }

                const payload = {
                        sub: user.id,
                        username: user.username,
                };

                return {
                        access_token: await this.jwtService.signAsync(payload),
                };
        }
}
