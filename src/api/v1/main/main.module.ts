import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class MainModule {}
