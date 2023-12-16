import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  registerUser(): string {
    return 'hello';
  }

  @Post('login')
  loginUser(): string {
    return 'hello';
  }
}
