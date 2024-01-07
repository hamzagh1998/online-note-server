import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Notification {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: null, required: false })
  userPhoto: string | null;

  @Prop({ default: null, required: false })
  link: string | null;

  @Prop({ default: false, required: true })
  viewed: boolean;

  @Prop({ default: () => new Date().toUTCString(), required: true })
  createdAt: Date;

  @Prop({ default: null, required: false })
  viewedAt: Date | null;
}

export type NotificationDocument = Notification & Document;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
