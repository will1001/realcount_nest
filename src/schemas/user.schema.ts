import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  id_kabupaten: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
