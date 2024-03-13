import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: 'Plan' }) // Reference to the User model
  plan: Types.ObjectId; // Store the user's ObjectId

  @Prop({ default: false, required: true })
  isPremium: boolean;

  @Prop({ default: null, required: false })
  subscriptionStartDate: Date | null;

  @Prop({ default: null, required: false })
  subscriptionEndDate: Date | null;

  @Prop({ default: null, required: false })
  subscriptionLastRenewalDate: Date | null;

  @Prop({ default: 0, required: true })
  storgeUsageInMb: number;
}

export type ProfileDocument = Profile & Document;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
