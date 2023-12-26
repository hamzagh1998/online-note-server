import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Folder {
  @Prop({ type: Types.ObjectId, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Folder' }) // Reference to the Folder model
  parentDirectory: Types.ObjectId; // Store the folder's ObjectId

  @Prop({ default: 'folder' })
  type: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ type: Types.ObjectId, ref: 'GenericItem' })
  children: Array<Types.ObjectId>;

  @Prop({ default: null })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString() }) // Set default value to current UTC date and time
  createdAt: Date;

  @Prop({ default: null })
  lastUpdate: Date | null;
}

export type FolderDocument = Folder & Document;

export const FolderSchema = SchemaFactory.createForClass(Folder);
