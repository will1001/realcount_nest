import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DapilDocument = HydratedDocument<Dapil>;

@Schema()
export class Dapil {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  jml_kecamatan: number;

  @Prop()
  jml_kelurahan: number;

  @Prop()
  jml_tps: number;
}

export const DapilSchema = SchemaFactory.createForClass(Dapil);
