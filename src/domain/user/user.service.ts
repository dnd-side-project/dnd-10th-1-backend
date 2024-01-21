import { Prisma } from '@prisma/client';
import { isNull } from 'lodash';

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { createOrConditionParam } from '@/common/utils';

import { PrismaService } from '@/shared-service/prisma';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
        constructor(private readonly prismaService: PrismaService) {}

        async checkDuplicateUserName(username: string) {
                const isUnique = await this.prismaService.user.findUnique({
                        where: {
                                username,
                        },
                });

                return isUnique;
        }

        async checkDuplicateEmail(email: string) {
                const isUnique = await this.prismaService.user.findUnique({
                        where: {
                                email,
                        },
                });

                return isUnique;
        }

        async checkExistUser(condition: Prisma.UserWhereInput) {
                const isExist = await this.prismaService.user.findFirst({
                        where: {
                                OR: createOrConditionParam<Prisma.UserWhereInput>(condition),
                        },
                });

                return isExist;
        }

        async findUserById(userId: number) {
                const user = await this.prismaService.user.findUnique({
                        where: {
                                id: userId,
                        },
                });

                return {
                        userId: user.id,
                        password: user.password,
                        username: user.username,
                };
        }

        async findOne({ userId, username }: { userId?: number; username?: string }) {
                const user = await this.prismaService.user.findFirst({
                        where: {
                                OR: [
                                        {
                                                id: userId != null ? userId : undefined,
                                        },
                                        {
                                                username: username || undefined,
                                        },
                                ],
                        },
                });

                if (isNull(user)) {
                        throw new HttpException('User is not existed', HttpStatus.BAD_REQUEST);
                }

                return user;
        }

        async signUp(createUserDto: CreateUserDto) {
                const { username, password, email } = createUserDto;

                const isUserNameUnique = await this.checkDuplicateUserName(username);

                if (isUserNameUnique) {
                        throw new BadRequestException('Username is already taken');
                }

                const isEmailUnique = await this.checkDuplicateEmail(email);

                if (isEmailUnique) {
                        throw new BadRequestException('Email is already registerd');
                }

                const user = await this.prismaService.extended.user.create({
                        data: {
                                username,
                                email,
                                password,
                        },
                });

                return user;
        }

        async update(userId, updateProfile) {
                const { username, email } = updateProfile;

                const isUserNameUnique = await this.checkDuplicateUserName(username);
                const isEmailUnique = await this.checkDuplicateEmail(email);

                if (!isUserNameUnique || !isEmailUnique) {
                        throw new BadRequestException('username or email already set');
                }

                await this.prismaService.user.update({
                        where: {
                                id: userId,
                        },
                        data: {
                                ...updateProfile,
                        },
                });
        }

        async remove(userId: number) {
                const isExistUser = await this.checkExistUser({ id: userId });

                if (!isExistUser) {
                        throw new BadRequestException('user does not exist.');
                }

                await this.prismaService.user.delete({
                        where: {
                                id: userId,
                        },
                });
        }
}
