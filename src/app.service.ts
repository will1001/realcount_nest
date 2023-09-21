import { BadRequestException, Injectable } from '@nestjs/common';
import { Dapil } from './schemas/dapil.schema';
import { TargetSuara } from './schemas/targetSuara.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Kabupaten } from './schemas/kabupaten.schema';
import { Category } from './schemas/category.schema';
import { SubCategory } from './schemas/subCategory.schema';
import { Kecamatan } from './schemas/kecamatan.schema';
import { Kelurahan } from './schemas/kelurahan.schema';
import { Pemilih } from './schemas/pemilih.schema';
import { Suara } from './schemas/suara.schema';
import { DprLevel } from './schemas/dprLevel.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Dapil.name) private dapilModel: Model<Dapil>,
    @InjectModel(TargetSuara.name) private targetSuara: Model<TargetSuara>,
    @InjectModel(Kabupaten.name) private kabupaten: Model<Kabupaten>,
    @InjectModel(Category.name) private category: Model<Category>,
    @InjectModel(SubCategory.name) private subCategory: Model<SubCategory>,
    @InjectModel(Kecamatan.name) private kecamatan: Model<Kecamatan>,
    @InjectModel(Kelurahan.name) private kelurahan: Model<Kelurahan>,
    @InjectModel(Pemilih.name) private pemilih: Model<Pemilih>,
    @InjectModel(Suara.name) private suara: Model<Suara>,
    @InjectModel(DprLevel.name) private dprLevel: Model<DprLevel>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDapil(): Promise<Dapil[]> {
    return this.dapilModel.find().exec();
  }
  async getTarget(): Promise<any> {
    const targets: any = await this.targetSuara.find().exec();
    let output = [];
    for (const target of targets) {
      const dapil: any = await this.dapilModel.findOne({
        _id: target.id_dapil,
      });
      output.push({
        _id: target._id,
        id_dapil: target.id_dapil,
        anggota: target.anggota,
        bko: target.bko,
        bpkk: target.bpkk,
        bpu: target.bpu,
        dpc: target.dpc,
        dpra: target.dpra,
        kepemudaan: target.kepemudaan,
        tn: target.tn,
        dapil,
      });
    }
    return output;
  }

  async postTarget(bodyTarget: any): Promise<any> {
    // const data = {
    //   ...bodyTarget,
    //   _id: new Types.ObjectId(),
    // };

    // const created = new this.targetSuara(data);
    //   return created.save();

    return await this.targetSuara.findOneAndUpdate(
      { id_dapil: bodyTarget.id_dapil },
      bodyTarget,
      { new: true, upsert: true },
    );
  }
  async getKabupaten(): Promise<Kabupaten[]> {
    return this.kabupaten.find().exec();
  }
  async getCategory(): Promise<Category[]> {
    return this.category.find().exec();
  }
  async getSubCategory(id: number): Promise<SubCategory[]> {
    return this.subCategory.find({ category_id: +id }).exec();
  }
  async getKecamatan(id: String): Promise<Kecamatan[]> {
    return this.kecamatan.find({ id_kabupaten: id }).exec();
  }
  async getKelurahan(id: String): Promise<Kelurahan[]> {
    return this.kelurahan.find({ id_kecamatan: id }).exec();
  }
  async postPemilih(bodyTarget: any): Promise<any> {
    const findPemilih: any = await this.pemilih.findOne({
      nik: bodyTarget.nik,
    });

    if (findPemilih) {
      throw new BadRequestException('Nik Sudah Terdaftar');
    }

    const id_pemilih = new Types.ObjectId();

    const data_pemilih = {
      ...bodyTarget,
      _id: id_pemilih,
    };
    delete data_pemilih.id_dpr_level;

    const created_pemilih = new this.pemilih(data_pemilih);
    created_pemilih.save();

    for (const el of bodyTarget.id_dpr_level) {
      const data_suara = {
        _id: new Types.ObjectId(),
        user_id: id_pemilih,
        id_dpr_level: el,
      };
      const created_suara = new this.suara(data_suara);
      created_suara.save();
    }
    return {};
  }

  async getDprLevel(): Promise<DprLevel[]> {
    return this.dprLevel.find().exec();
  }

  async getSuara(query: any): Promise<any> {
    const { id_dpr_level, id_kabupaten, dapil } = query;
    let filter: any = {};

    if (id_dpr_level) filter.id_dpr_level = id_dpr_level;
    if (id_kabupaten) filter['pemilih.id_kabupaten'] = id_kabupaten;
    if (dapil === '1') {
      filter['pemilih.id_kabupaten'] = { $in: ['5271'] };
    }
    if (dapil === '2') {
      filter['pemilih.id_kabupaten'] = { $in: ['5201', '5208'] };
    }
    if (dapil === '3') {
      filter['pemilih.id_kecamatan'] = {
        $in: [
          '5203031',
          '5203030',
          '5203040',
          '5203020',
          '5203021',
          '5203022',
          '5203010',
          '5203011',
        ],
      };
    }
    if (dapil === '4') {
      filter['pemilih.id_kecamatan'] = {
        $nin: [
          '5203031',
          '5203030',
          '5203040',
          '5203020',
          '5203021',
          '5203022',
          '5203010',
          '5203011',
        ],
      };
    }
    if (dapil === '5') {
      filter['pemilih.id_kabupaten'] = { $in: ['5207', '5204'] };
    }
    if (dapil === '6') {
      filter['pemilih.id_kabupaten'] = { $in: ['5206', '5272', '5205'] };
    }
    if (dapil === '7') {
      filter['pemilih.id_kecamatan'] = {
        $in: ['5202060', '5202061', '5202040', '5202050', '5202090', '5202091'],
      };
    }
    if (dapil === '8') {
      filter['pemilih.id_kecamatan'] = {
        $nin: [
          '5202060',
          '5202061',
          '5202040',
          '5202050',
          '5202090',
          '5202091',
        ],
      };
    }

    const data = this.suara.aggregate([
      {
        $lookup: {
          from: 'pemilihs',
          localField: 'user_id',
          foreignField: '_id',
          as: 'pemilih',
        },
      },
      {
        $unwind: {
          path: '$pemilih',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: { ...filter },
      },
      {
        $group: {
          _id: '$id_dpr_level',
          anggota: {
            $sum: {
              $cond: [{ $ne: ['$pemilih.id_upa', ''] }, 1, 0],
            },
          },
          dpc: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_sub_category', '5'] }, 1, 0],
            },
          },
          dpra: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_sub_category', '6'] }, 1, 0],
            },
          },
          bko: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', '5'] }, 1, 0],
            },
          },
          bpkk: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', '4'] }, 1, 0],
            },
          },
          bpu: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', '7'] }, 1, 0],
            },
          },
          kepemudaan: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', '6'] }, 1, 0],
            },
          },
          tn: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', '8'] }, 1, 0],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          anggota: 1,
          dpc: 1,
          dpra: 1,
          bko: 1,
          bpkk: 1,
          bpu: 1,
          kepemudaan: 1,
          tn: 1,
        },
      },
    ]);

    return data;

    // return this.suara.aggregate([
    //   // {
    //   //   $group: {
    //   //     _id: '$id_dpr_level',
    //   //     count: { $sum: 1 },
    //   //   },
    //   // },
    //   // {
    //   //   $lookup: {
    //   //     from: 'pemilihs',
    //   //     localField: 'user_id',
    //   //     foreignField: '_id',
    //   //     as: 'pemilih',
    //   //   },
    //   // },
    //   // {
    //   //   $unwind: {
    //   //     path: '$pemilih',
    //   //     preserveNullAndEmptyArrays: true,
    //   //   },
    //   // },
    //   {
    //     $match: filter,
    //   },
    // ]);
  }
}
