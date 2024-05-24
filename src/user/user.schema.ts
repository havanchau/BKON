import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  fullname: string;

  @Prop()
  username?: string;

  @Exclude()
  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
