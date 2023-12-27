import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { RegisterRequestBodyDto } from '../dto/register-user.req';
import { LoginRequestBodyDto } from '../dto/login-user.req';

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
    const result = await this.authService.registerService(body);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  )
  async login(@Body() body: LoginRequestBodyDto, @Res() res: Response) {
    const result = await this.authService.loginService(body);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Get('user-data')
  async auth(@Body() body, @Res() res: Response) {
    const email = body.user.email;

    const result = await this.authService.authService(email);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }
}
