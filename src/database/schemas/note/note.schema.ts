import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Note {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' }) // Reference to the User model
  owner: Types.ObjectId; // Store the user's ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: 'Folder' }) // Reference to the Folder model
  parentDirectory: Types.ObjectId; // Store the folder's ObjectId

  @Prop({ default: 'note', required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false, required: true })
  isShared: boolean;

  @Prop({ default: false, required: true })
  isFavorite: boolean;

  @Prop({ default: null, required: false })
  password: string | null;

  @Prop({ default: () => new Date().toUTCString(), required: true }) // Set default value to current UTC date and time
  createdAt: Date;

  @Prop({ default: null, required: false })
  lastUpdate: Date | null;
}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);
