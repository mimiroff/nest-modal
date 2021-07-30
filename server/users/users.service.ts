import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Password } from '../utils/password';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(
        {
          statusCode: status,
          message: 'User with the given id is not found.',
        },
        status,
      );
    }

    return user;
  }

  async createUser(userDto: UserCreateDto): Promise<number> {
    const { email, firstName, lastName, password } = userDto;

    const user = await this.userRepository.findOne({ email });
    if (user) {
      const status = HttpStatus.CONFLICT;
      throw new HttpException(
        {
          statusCode: status,
          message: 'User with the given email already exists.',
        },
        status,
      );
    }

    const newUser = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: await Password.hash(password),
    });
    await this.userRepository.save(newUser);
    return newUser.id;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
