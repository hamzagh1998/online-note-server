import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class File {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ default: undefined, required: false })
  fileType: string | undefined;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ressourceLink: string;

  @Prop({ required: true })
  extension: string | undefined;

  @Prop({ required: true })
  fileSizeMB: number;

  @Prop({ default: false, required: false })
  isShared: boolean;

  @Prop({ default: false, required: false })
  isFavorite: boolean;

  @Prop({ default: null, required: false })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString(), required: true }) // Set default value to current UTC date and time
  createdAt: Date;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
