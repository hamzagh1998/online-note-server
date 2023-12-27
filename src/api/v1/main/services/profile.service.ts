import { HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/database/models/user/user.repository';
import { ProfileRepository } from 'src/database/models/profile/profile.repository';
import { PlanRepository } from 'src/database/models/plan/plan.repository';
import { ProfileResponseType } from '../types/profile.types';

@Injectable()
export class ProfileService {
  constructor(
    private userRepo: UserRepository,
    private planRepository: PlanRepository,
    private profileRepository: ProfileRepository,
  ) {}

  async infoService(email: string) {
    const userDoc = await this.userRepo.findOne({ email });
    if (!userDoc) {
      return {
        error: true,
        statusCode: HttpStatus.CONFLICT,
        detail: "User with this email doesn't",
      };
    }

    const profileDoc = await this.profileRepository.findOne({
      owner: userDoc._id,
    });
    const palnDoc = await this.planRepository.findOne({
      _id: profileDoc.plan,
    });

    const result: ProfileResponseType = {
      plan: palnDoc.type as 'free' | 'primium',
      isPremium: profileDoc.isPremium,
      subscriptionStartDate: profileDoc.subscriptionStartDate,
      subscriptionEndDate: profileDoc.subscriptionEndDate,
      subscriptionLastRenewalDate: profileDoc.subscriptionLastRenewalDate,
      storgeUsageInMb: profileDoc.storgeUsageInMb,
    };
    return { error: false, statusCode: HttpStatus.OK, detail: result };
  }

  async updateService() {}
}
