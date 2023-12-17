import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { RegisterRequestBodyDto } from '../dto/register-user.req';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Automatically transform incoming payloads to instances of the DTO class
      whitelist: false, // Don't strip any properties that do not have any decorator
      forbidNonWhitelisted: false, // Don't throw an error if non-whitelisted properties are present
    }),
  )
  async register(@Body() body: RegisterRequestBodyDto, @Res() res: Response) {
    const result = await this.authService.register(body);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Post('login')
  login(): string {
    return 'hello';
  }
}
