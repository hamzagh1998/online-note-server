import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class GenericItem {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ default: 'root', required: true })
  name: string;

  @Prop({
    type: Types.ObjectId,
    default: null,
    required: false,
    ref: 'GenericItem',
  }) // Reference to the GenericItem model
  parentDirectory: Types.ObjectId; // Store the GenericItem's ObjectId

  @Prop({ default: false, required: true })
  isFavorite: boolean;

  @Prop({ default: false, required: false })
  isPrivate: boolean;

  @Prop({ type: String, required: true, enum: ['folder', 'note', 'file'] })
  type: 'folder' | 'note' | 'file';

  @Prop({ type: Types.ObjectId, required: true })
  itemId: Types.ObjectId;
}

export type GenericItemDocument = GenericItem & Document;

export const GenericItemSchema = SchemaFactory.createForClass(GenericItem);
