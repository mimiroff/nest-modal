import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/user-create.dto';
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
}
