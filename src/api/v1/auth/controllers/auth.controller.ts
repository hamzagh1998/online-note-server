import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { RegisterRequestDto } from '../dto/register-user.req';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Automatically transform incoming payloads to instances of the DTO class
      whitelist: true, // Strip any properties that do not have any decorator
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    }),
  )
  async registerUser(@Body() body: RegisterRequestDto, @Res() res: Response) {
    const result = await this.authService.registerService(body);
    const { statusCode, ...rest } = result;

    res.status(statusCode).json(rest);
  }

  @Post('login')
  loginUser(): string {
    return 'hello';
  }
}
