import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KabupatenDocument = HydratedDocument<Kabupaten>;

@Schema()
export class Kabupaten {
  @Prop()
  _id: string;

  @Prop()
  name: string;

}

export const KabupatenSchema = SchemaFactory.createForClass(Kabupaten);
