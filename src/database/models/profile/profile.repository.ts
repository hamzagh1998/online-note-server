import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Profile, ProfileDocument } from './profile.schema';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository extends EntityRepository<ProfileDocument> {
  constructor(
    @InjectModel(Profile.name) userProfileModel: Model<ProfileDocument>,
  ) {
    super(userProfileModel);
  }
}
