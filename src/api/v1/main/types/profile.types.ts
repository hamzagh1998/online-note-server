import { Types } from 'mongoose';

import { NotificationDocument } from 'src/database/models/notifictaions/notification.schema';

export type ProfileResponseType = {
  plan: 'free' | 'primium';
  isPremium: boolean;
  currentFolder: {
    folderName: string;
    id: Types.ObjectId;
    parentDirectory: Types.ObjectId | null;
    children: Array<Types.ObjectId> | [];
  };
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  subscriptionLastRenewalDate: Date | null;
  storgeUsageInMb: number;
  notifications: Array<NotificationDocument>;
};
