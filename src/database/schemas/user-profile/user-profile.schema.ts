import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserProfile {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: 'Plan' }) // Reference to the User model
  plan: Types.ObjectId; // Store the user's ObjectId

  @Prop({ default: false, required: true })
  isPremium: boolean;

  @Prop({ default: () => new Date().toUTCString(), required: false }) // Set default value to current UTC date and time
  subscriptionStartDate: Date;

  @Prop({ default: () => new Date().toUTCString(), required: false }) // Set default value to current UTC date and time
  subscriptionEndDate: Date;

  @Prop({ default: () => new Date().toUTCString(), required: false }) // Set default value to current UTC date and time
  subscriptionLastRenewalDate: Date;

  @Prop({ default: 0, required: true })
  storgeUsageInMb: number;
}

export type UserProfileDocument = UserProfile & Document;

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
