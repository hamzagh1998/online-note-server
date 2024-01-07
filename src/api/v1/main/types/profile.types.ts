import { NotificationDocument } from 'src/database/models/notifictaions/notification.schema';

export type ProfileResponseType = {
  plan: 'free' | 'primium';
  isPremium: boolean;
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  subscriptionLastRenewalDate: Date | null;
  storgeUsageInMb: number;
  notifications: Array<NotificationDocument>;
};
