import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Note {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: 'Folder' }) // Reference to the Folder model
  parentDirectory: Types.ObjectId; // Store the genericItem's ObjectId

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  ressourceLinks: Array<{ url: string; fileSizeMB: number }>;

  @Prop({ required: true })
  fileSizeMB: number;

  @Prop({ default: false, required: false })
  isShared: boolean;

  @Prop({ default: false, required: false })
  isFavorite: boolean;

  @Prop({ default: null, required: false })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString(), required: false }) // Set default value to current UTC date and time
  createdAt: Date;

  @Prop({ default: null, required: false })
  lastUpdate: Date | null;
}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);
