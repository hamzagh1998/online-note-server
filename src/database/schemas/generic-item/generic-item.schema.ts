import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class GenericItem {
  @Prop({ type: Types.ObjectId, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: String, required: true, enum: ['folder', 'note', 'file'] })
  type: 'folder' | 'note' | 'file';

  @Prop({ type: Types.ObjectId, required: true })
  itemId: Types.ObjectId;
}

export type GenericItemDocument = GenericItem & Document;

export const GenericItemSchema = SchemaFactory.createForClass(GenericItem);
