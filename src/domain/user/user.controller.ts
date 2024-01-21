import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '@/common/decorators';

import { UpdateUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
        constructor(private userService: UserService) {}

        @Get(':id/profile')
        @ApiParam({ name: 'id', description: '유저 ID' })
        @ApiBearerAuth()
        findOne(@Param('id') id: number) {
                return this.userService.findOne({
                        userId: id,
                });
        }

        @Post()
        @PublicRoute()
        create(@Body() createUserDto: CreateUserDto) {
                return this.userService.signUp(createUserDto);
        }

        @Patch(':id/profile')
        @ApiParam({ name: 'id', description: '유저 ID' })
        @ApiBearerAuth()
        update(
                @Param('id') id: number,
                @Body()
                updateUserProfile: UpdateUserDto,
        ) {
                return this.userService.update(id, updateUserProfile);
        }

        @Delete(':id')
        @ApiParam({ name: 'id', description: '유저 ID' })
        @ApiBearerAuth()
        remove(@Param('id') id: number) {
                return this.userService.remove(id);
        }
}
