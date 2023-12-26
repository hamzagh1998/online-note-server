import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from 'src/database/entity.repository';

import { File, FileDocument } from './file.schema';

@Injectable()
export class FileRepository extends EntityRepository<FileDocument> {
  constructor(@InjectModel(File.name) fileModel: Model<FileDocument>) {
    super(fileModel);
  }
}
