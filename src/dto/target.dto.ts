import { IsNotEmpty } from 'class-validator';
export class ReqBodyTargetDto {
  // @IsNotEmpty()
  id_dapil: number;
  anggota: number;
  dpc: number;
  dpra: number;
  bpkk: number;
  tn: number;
  kepemudaan: number;
  bko: number;
  bpu: number;
}

export class responseEnrollmentsDto {
  name: string;

  nisn: string;
}
