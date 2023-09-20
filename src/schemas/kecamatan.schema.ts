import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KecamatanDocument = HydratedDocument<Kecamatan>;

@Schema()
export class Kecamatan {
  @Prop()
  _id: String;

  @Prop()
  id_kabupaten: String;

  @Prop()
  name: string;

}

export const KecamatanSchema = SchemaFactory.createForClass(Kecamatan);
