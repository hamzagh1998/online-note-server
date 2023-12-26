import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from 'src/database/entity.repository';

import { Note, NoteDocument } from './note.schema';

@Injectable()
export class NoteRepository extends EntityRepository<NoteDocument> {
  constructor(@InjectModel(Note.name) noteModel: Model<NoteDocument>) {
    super(noteModel);
  }
}
