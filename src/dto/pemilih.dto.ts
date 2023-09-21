import { IsNotEmpty } from 'class-validator';
export class ReqBodyPemilihDto {
  // @IsNotEmpty()

  nama: string;

  nik: string;

  gender: string;

  alamat: string;

  tps: string;

  id_kabupaten: string;

  id_kecamatan: string;

  id_kelurahan: string;

  id_Pemilih: string;

  id_sub_Pemilih: string;

  id_upa: string;

  id_dpr_level: any;
}
