import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DprLevelDocument = HydratedDocument<DprLevel>;

@Schema()
export class DprLevel {
  @Prop()
  _id: number;

  @Prop()
  name: string;

}

export const DprLevelSchema = SchemaFactory.createForClass(DprLevel);
