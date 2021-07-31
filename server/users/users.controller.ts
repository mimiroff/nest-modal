import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Request() req): Promise<UserDto> {
    return this.usersService.getUser(req.user.userId);
  }

  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<number> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Request() req,
    @Body() update: UserUpdateDto,
  ): Promise<UserDto> {
    if (req.user.userId !== parseInt(userId, 10)) {
      const status = HttpStatus.FORBIDDEN;
      throw new HttpException(
        {
          statusCode: status,
          message: `Only data of user with id ${req.user.userId} can be accessed. Given id is ${userId}`,
        },
        status,
      );
    }
    return this.usersService.updateUser(userId, update);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(
    @Param('userId') userId: string,
    @Request() req,
  ): Promise<boolean> {
    if (req.user.userId !== parseInt(userId, 10)) {
      const status = HttpStatus.FORBIDDEN;
      throw new HttpException(
        {
          statusCode: status,
          message: `Only data of user with id ${req.user.userId} can be accessed. Given id is ${userId}`,
        },
        status,
      );
    }
    return this.usersService.deleteUser(userId);
  }
}
