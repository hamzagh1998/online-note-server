import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { EntityRepository } from 'src/database/entity.repository';

import { Folder, FolderDocument } from './folder.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FolderRepository extends EntityRepository<FolderDocument> {
  constructor(@InjectModel(Folder.name) folderModel: Model<FolderDocument>) {
    super(folderModel);
  }
}
