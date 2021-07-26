import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  getHello(): LoginDto {
    return { message: 'Hello World!' };
  }
}
