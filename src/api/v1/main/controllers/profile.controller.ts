import { Body, Controller, Get, Patch, Res } from '@nestjs/common';
import { Response } from 'express';

import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('info')
  async info(@Body() body, @Res() res: Response) {
    const email = body.user.email;

    const result = await this.profileService.infoService(email);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Patch('notification')
  async notification(@Body() body, @Res() res: Response) {
    const result = await this.profileService.notifService(body);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Patch('update')
  async update() {}
}
