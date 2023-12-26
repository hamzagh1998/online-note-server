import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserProfile, UserProfileDocument } from './user-profile.schema';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserProfileRepository extends EntityRepository<UserProfileDocument> {
  constructor(
    @InjectModel(UserProfile.name) userProfileModel: Model<UserProfileDocument>,
  ) {
    super(userProfileModel);
  }
}
