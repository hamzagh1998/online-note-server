import { HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/database/models/user/user.repository';
import { ProfileRepository } from 'src/database/models/profile/profile.repository';
import { PlanRepository } from 'src/database/models/plan/plan.repository';
import { NotificationRepository } from 'src/database/models/notifictaions/notification.repository';

import { ProfileResponseType } from '../types/profile.types';
import { FolderRepository } from 'src/database/models/folder/folder.repository';

@Injectable()
export class ProfileService {
  constructor(
    private userRepo: UserRepository,
    private planRepository: PlanRepository,
    private folderRepository: FolderRepository,
    private profileRepository: ProfileRepository,
    private notificationRepository: NotificationRepository,
  ) {}

  async infoService(email: string) {
    const userDoc = await this.userRepo.findOne({ email });
    if (!userDoc) {
      return {
        error: true,
        statusCode: HttpStatus.NOT_FOUND,
        detail: "User with this email doesn't exists",
      };
    }

    const folderDoc = await this.folderRepository.findOne({
      owner: userDoc._id,
      isRoot: true,
    });

    const profileDoc = await this.profileRepository.findOne({
      owner: userDoc._id,
    });

    const palnDoc = await this.planRepository.findOne({
      _id: profileDoc.plan,
    });

    const notificationsDoc = await this.notificationRepository.find(
      {
        owner: userDoc._id,
        viewed: false,
      },
      { _id: 0, owner: 0, viewedAt: 0, viewed: 0 },
    );

    const result: ProfileResponseType = {
      plan: palnDoc.type as 'free' | 'primium',
      isPremium: profileDoc.isPremium,
      currentFolder: {
        id: folderDoc._id,
        folderName: folderDoc.name,
        parentDirectory: folderDoc.parentDirectory,
        children: folderDoc.children,
      },
      subscriptionStartDate: profileDoc.subscriptionStartDate,
      subscriptionEndDate: profileDoc.subscriptionEndDate,
      subscriptionLastRenewalDate: profileDoc.subscriptionLastRenewalDate,
      storgeUsageInMb: profileDoc.storgeUsageInMb,
      notifications: notificationsDoc,
    };
    return { error: false, statusCode: HttpStatus.OK, detail: result };
  }

  async notifService(id: string) {
    try {
      await this.notificationRepository.findOneAndUpdate(
        { id },
        { viewed: true, viewedAt: new Date().toUTCString() },
      );
      return { error: false, statusCode: HttpStatus.OK, detail: 'success' };
    } catch (error) {
      return {
        error: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        detail: 'Internal server error',
      };
    }
  }

  async updateService() {}
}
