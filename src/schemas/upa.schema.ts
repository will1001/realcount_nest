import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UpaDocument = HydratedDocument<Upa>;

@Schema()
export class Upa {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  id_sub_category: string;

  @Prop()
  jml_anggota: string;

}

export const UpaSchema = SchemaFactory.createForClass(Upa);
