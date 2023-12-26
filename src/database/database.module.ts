import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user/user.schema';
import { UserRepository } from './schemas/user/user.repository';

import {
  UserProfile,
  UserProfileSchema,
} from './schemas/user-profile/user-profile.schema';
import { UserProfileRepository } from './schemas/user-profile/user-profile.repository';

import { PlanRepository } from './schemas/plan/plan.repository';
import { Plan, PlanSchema } from './schemas/plan/plan.schema';

import {
  GenericItem,
  GenericItemSchema,
} from './schemas/generic-item/generic-item.schema';
import { GenericItemRepository } from './schemas/generic-item/generic-item.repository';

import { Folder, FolderSchema } from './schemas/folder/folder.schema';
import { FolderRepository } from './schemas/folder/folder.repository';

import { Note, NoteSchema } from './schemas/note/note.schema';
import { NoteRepository } from './schemas/note/note.repository';

import { File, FileSchema } from './schemas/file/file.schema';
import { FileRepository } from './schemas/file/file.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
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
