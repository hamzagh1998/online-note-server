import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './models/user/user.schema';
import { UserRepository } from './models/user/user.repository';

import {
  UserProfile,
  UserProfileSchema,
} from './models/user-profile/user-profile.schema';
import { UserProfileRepository } from './models/user-profile/user-profile.repository';

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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: GenericItem.name, schema: GenericItemSchema },
      { name: Folder.name, schema: FolderSchema },
      { name: Note.name, schema: NoteSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  providers: [
    UserRepository,
    UserProfileRepository,
    PlanRepository,
    GenericItemRepository,
    FolderRepository,
    NoteRepository,
    FileRepository,
  ],
  exports: [
    UserRepository,
    UserProfileRepository,
    PlanRepository,
    GenericItemRepository,
    FolderRepository,
    NoteRepository,
    FileRepository,
  ],
})
export class DatabaseModule {}
