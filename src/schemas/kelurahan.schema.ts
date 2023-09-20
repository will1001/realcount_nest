import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KelurahanDocument = HydratedDocument<Kelurahan>;

@Schema()
export class Kelurahan {
  @Prop()
  _id: String;

  @Prop()
  id_kecamatan: String;

  @Prop()
  name: string;
}

export const KelurahanSchema = SchemaFactory.createForClass(Kelurahan);
