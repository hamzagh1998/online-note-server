import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { FolderController } from './controllers/folder.controller';
import { FolderService } from './services/folder.service';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController, FolderController, FileController],
  providers: [ProfileService, FolderService, FileService],
})
export class MainModule {}
