import { IsNotEmpty, IsEmail, Length, IsNumberString } from 'class-validator';

export class ReqQueryUpaDto {
  @IsNotEmpty()
  id_sub_category: string;

  @IsNotEmpty()
  id_kabupaten: string;

}
