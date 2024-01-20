import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { FolderController } from './controllers/folder.controller';
import { FolderService } from './services/folder.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController, FolderController],
  providers: [ProfileService, FolderService],
})
export class MainModule {}
