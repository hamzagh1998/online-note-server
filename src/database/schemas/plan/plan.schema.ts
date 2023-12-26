import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Plan {
  @Prop({ type: String, enum: ['free', 'prmium'], default: 'free' })
  type: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 500 })
  maxStorageUsageInMb: number;
}

export type PlanDocument = Plan & Document;

export const PlanSchema = SchemaFactory.createForClass(Plan);
