import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Folder {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ default: 'folder', required: true })
  type: string;

  @Prop({ default: 'root', required: true })
  name: string;

  @Prop({ default: false, required: false })
  isRoot: boolean;

  @Prop({ default: false, required: true })
  isFavorite: boolean;

  @Prop({
    type: Types.ObjectId,
    default: null,
    required: false,
    ref: 'GenericItem',
  })
  parentDirectory: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    default: [],
    required: false,
    ref: 'GenericItem',
  })
  children: Array<Types.ObjectId>;

  @Prop({ default: null, required: false })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString(), required: true }) // Set default value to current UTC date and time
  createdAt: Date;

  @Prop({ default: null, required: false })
  lastUpdate: Date | null;
}

export type FolderDocument = Folder & Document;

export const FolderSchema = SchemaFactory.createForClass(Folder);
