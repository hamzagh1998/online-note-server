import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenericItem, GenericItemDocument } from './generic-item.schema';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class GenericItemRepository extends EntityRepository<GenericItemDocument> {
  constructor(
    @InjectModel(GenericItem.name) genericItemModel: Model<GenericItemDocument>,
  ) {
    super(genericItemModel);
  }
}
