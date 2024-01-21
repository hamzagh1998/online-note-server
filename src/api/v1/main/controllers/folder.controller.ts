import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { GetFolderRequestDto } from '../dto/get-folder.req';
import { CreateFolderRequestDto } from '../dto/create-folder.req';

import { FolderService } from '../services/folder.service';

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get('get-folder-data')
  async getFolderData(
    @Query('gItemId') gItemId: string,
    @Body() body: GetFolderRequestDto,
    @Res() res: Response,
  ) {
    const email = body.user.email;

    const result = await this.folderService.getFolderDataService(
      email,
      gItemId,
    );
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  @Post('create-folder')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  )
  async createFilder(
    @Body() body: CreateFolderRequestDto,
    @Res() res: Response,
  ) {
    const result = await this.folderService.createFolderService(body);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }
}
