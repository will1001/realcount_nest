import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuaraDocument = HydratedDocument<Suara>;

@Schema()
export class Suara {
  @Prop()
  _id: string;

  @Prop()
  user_id: string;

  @Prop()
  id_dpr_level: string;

}

export const SuaraSchema = SchemaFactory.createForClass(Suara);
