import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): LoginDto {
    return this.authService.getHello();
  }
}
