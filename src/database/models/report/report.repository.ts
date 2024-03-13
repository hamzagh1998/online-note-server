import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Report, ReportDocument } from './report.schema';

import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class ReportRepository extends EntityRepository<ReportDocument> {
  constructor(@InjectModel(Report.name) reportModel: Model<ReportDocument>) {
    super(reportModel);
  }
}
