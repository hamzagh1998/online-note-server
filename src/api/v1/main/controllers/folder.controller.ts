import {
  Body,
  Controller,
  Get,
  // Post,
  Res,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

// import { CreateFolderRequestDto } from '../dto/create-folder.req';

import { FolderService } from '../services/folder.service';

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get('get-folder-data')
  async getFolderData(@Body() body, @Res() res: Response) {
    const email = body.user.email;

    const result = await this.folderService.getFolderDataService(email);
    const { statusCode, ...rest } = result;

    return res.status(statusCode).json(rest);
  }

  // @Post('create-folder')
  // @UsePipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: false,
  //     forbidNonWhitelisted: false,
  //   }),
  // )
  // async createFilder(
  //   @Body() body: CreateFolderRequestDto,
  //   @Res() res: Response,
  // ) {
  //   const result = await this.folderService.createFolderService(body);
  //   const { statusCode, ...rest } = result;

  //   return res.status(statusCode).json(rest);
  // }
}
