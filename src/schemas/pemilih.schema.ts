import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PemilihDocument = HydratedDocument<Pemilih>;

@Schema()
export class Pemilih {
  @Prop()
  _id: string;

  @Prop()
  nama: string;

  @Prop()
  nik: string;

  @Prop()
  gender: string;

  @Prop()
  alamat: string;

  @Prop()
  tps: string;
  
  @Prop()
  id_kabupaten: string;

  @Prop()
  id_kecamatan: string;
  
  @Prop()
  id_kelurahan: string;

  @Prop()
  id_Pemilih: string;
  
  @Prop()
  id_sub_Pemilih: string;

  @Prop()
  id_upa: string;
  
  @Prop()
  id_dpr_level: string;

}

export const PemilihSchema = SchemaFactory.createForClass(Pemilih);
