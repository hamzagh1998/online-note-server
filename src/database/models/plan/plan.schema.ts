import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Plan {
  @Prop({
    type: String,
    required: true,
    enum: ['free', 'prmium'],
    default: 'free',
  })
  type: string;

  @Prop({ default: 0, required: true })
  price: number;

  @Prop({ default: 500, required: true })
  maxStorageUsageInMb: number;
}

export type PlanDocument = Plan & Document;

export const PlanSchema = SchemaFactory.createForClass(Plan);
