import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Dapil, DapilSchema } from './dapil.schema';
import * as mongoose from 'mongoose';
export type TargetSuaraDocument = HydratedDocument<TargetSuara>;

@Schema()
export class TargetSuara {
  @Prop()
  _id: string;

  @Prop()
  id_dapil: number;

  @Prop()
  anggota: number;

  @Prop()
  dpc: number;

  @Prop()
  dpra: number;

  @Prop()
  bpkk: number;

  @Prop()
  tn: number;

  @Prop()
  kepemudaan: number;

  @Prop()
  bko: number;

  @Prop()
  bpu: number;

  @Prop()
  id_dpr_level: number;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dapil' }],
  // })
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Dapil.name })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Dapil.name })
  dapils: Dapil[];
}

export const TargetSuaraSchema = SchemaFactory.createForClass(TargetSuara);
