import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from 'src/database/entity.repository';

import { Plan, PlanDocument } from './plan.schema';

@Injectable()
export class PlanRepository extends EntityRepository<PlanDocument> {
  constructor(@InjectModel(Plan.name) planModel: Model<PlanDocument>) {
    super(planModel);
  }
}
