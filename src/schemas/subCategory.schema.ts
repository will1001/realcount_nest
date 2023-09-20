import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema()
export class SubCategory {
  @Prop()
  _id: number;

  @Prop()
  category_id: number;

  @Prop()
  name: string;

}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
