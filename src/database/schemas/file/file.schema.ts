import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class File {
  @Prop({ type: Types.ObjectId, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Folder' }) // Reference to the Folder model
  parentDirectory: Types.ObjectId; // Store the folder's ObjectId

  @Prop({ default: 'file' })
  type: string;

  @Prop()
  name: string;

  @Prop()
  ressourceLink: string;

  @Prop()
  extension: string;

  @Prop({ default: false })
  isShared: boolean;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ default: null })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString() }) // Set default value to current UTC date and time
  createdAt: Date;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
