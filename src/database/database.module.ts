import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './models/user/user.schema';
import { UserRepository } from './models/user/user.repository';

import { Profile, ProfileSchema } from './models/profile/profile.schema';
import { ProfileRepository } from './models/profile/profile.repository';

import { PlanRepository } from './models/plan/plan.repository';
import { Plan, PlanSchema } from './models/plan/plan.schema';

import {
  GenericItem,
  GenericItemSchema,
} from './models/generic-item/generic-item.schema';
import { GenericItemRepository } from './models/generic-item/generic-item.repository';

import { Folder, FolderSchema } from './models/folder/folder.schema';
import { FolderRepository } from './models/folder/folder.repository';

import { Note, NoteSchema } from './models/note/note.schema';
import { NoteRepository } from './models/note/note.repository';

import { File, FileSchema } from './models/file/file.schema';
import { FileRepository } from './models/file/file.repository';

import { Report, ReportSchema } from './models/report/report.schema';
import { ReportRepository } from './models/report/report.repository';

import {
  Notification,
  NotificationSchema,
} from './models/notifictaions/notification.schema';
import { NotificationRepository } from './models/notifictaions/notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: GenericItem.name, schema: GenericItemSchema },
      { name: Folder.name, schema: FolderSchema },
      { name: Note.name, schema: NoteSchema },
      { name: File.name, schema: FileSchema },
      { name: Report.name, schema: ReportSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    UserRepository,
    ProfileRepository,
    PlanRepository,
    GenericItemRepository,
    FolderRepository,
    NoteRepository,
    FileRepository,
    ReportRepository,
    NotificationRepository,
  ],
  exports: [
    UserRepository,
    ProfileRepository,
    PlanRepository,
    GenericItemRepository,
    FolderRepository,
    NoteRepository,
    FileRepository,
    ReportRepository,
    NotificationRepository,
  ],
})
export class DatabaseModule {}
