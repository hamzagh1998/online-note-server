import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { FileService } from '../services/file.service';

import { uploadFileRequestDto } from '../dto/create-folder.req';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('upload-file')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  )
  async uploadFile(@Body() body: uploadFileRequestDto, @Res() res: Response) {
    const result = await this.fileService.uploadFileService(body);

    return res.status(200).json(result.detail);
  }
}
