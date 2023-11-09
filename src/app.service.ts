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
import { User } from './schemas/user.schema';
import { Upa } from './schemas/upa.schema';
import { ReqBodyPemilihDto } from './dto/pemilih.dto';

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
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(Upa.name) private upa: Model<Upa>,
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
  async postPemilih(bodyTarget: ReqBodyPemilihDto): Promise<any> {
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
    if (dapil === '4') {
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
    if (dapil === '3') {
      filter['pemilih.id_kecamatan'] = {
        $in: [
          '5203050',
          '5203060',
          '5203070',
          '5203080',
          '5203090',
          '5203100',
          '5203051',
          '5203061',
          '5203091',
          '5203092',
          '5203081',
          '5203071',
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
        $in: ['5202070', '5202020', '5202010', '5202030', '5202011', '5202080'],
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
              $cond: [{ $eq: ['$pemilih.id_sub_category', 5] }, 1, 0],
            },
          },
          dpra: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_sub_category', 6] }, 1, 0],
            },
          },
          bko: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', 5] }, 1, 0],
            },
          },
          bpkk: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', 4] }, 1, 0],
            },
          },
          bpu: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', 7] }, 1, 0],
            },
          },
          kepemudaan: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', 6] }, 1, 0],
            },
          },
          tn: {
            $sum: {
              $cond: [{ $eq: ['$pemilih.id_category', 8] }, 1, 0],
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

  async register(data: {
    username: string;
    id_kabupaten: string;
    password: string;
  }): Promise<any> {
    try {
      const Newdata = {
        ...data,
        _id: new Types.ObjectId(),
      };

      const created = new this.user(Newdata);
      return created.save();
    } catch (error) {
      throw error;
    }
  }

  async isUsernameRegistered(username: String): Promise<any> {
    return this.user.aggregate([
      {
        $match: { username },
      },
      {
        $lookup: {
          from: 'kabupatens',
          localField: 'id_kabupaten',
          foreignField: '_id',
          as: 'kabupaten',
        },
      },
      {
        $unwind: {
          path: '$kabupaten',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }

  async getUpa(query: any): Promise<Upa[]> {
    let filter: any = {};
    const { id_sub_category, id_kabupaten } = query;

    if (id_sub_category) filter.id_sub_category = id_sub_category;
    if (id_kabupaten) filter.id_kabupaten = id_kabupaten;
    if (id_sub_category) return this.upa.find(filter).exec();
  }

  async getPemilih(query: any): Promise<Upa[]> {
    const {
      nama,
      nik,
      gender,
      alamat,
      tps,
      id_kabupaten,
      id_kecamatan,
      id_kelurahan,
      id_category,
      id_sub_category,
      id_upa,
      id_dpr_level,
      dapil,
    } = query;
    let filter: any = {};
    let filterChild: any = {};
    if (id_dpr_level) filterChild.id_dpr_level = id_dpr_level;
    if (nama) filter.nama = nama;
    if (nik) filter.nik = nik;
    if (gender) filter.gender = gender;
    if (alamat) filter.alamat = alamat;
    if (tps) filter.tps = tps;
    if (id_kabupaten) filter.id_kabupaten = id_kabupaten;
    if (id_kecamatan) filter.id_kecamatan = id_kecamatan;
    if (id_kelurahan) filter.id_kelurahan = id_kelurahan;
    if (id_category) filter.id_category = Number(id_category);
    if (id_sub_category) filter.id_sub_category = Number(id_sub_category);
    if (id_upa) filter.id_upa = { $ne: '' };
    if (dapil === '1') {
      filter.id_kabupaten = { $in: ['5271'] };
    }
    if (dapil === '2') {
      filter.id_kabupaten = { $in: ['5201', '5208'] };
    }
    if (dapil === '4') {
      filter.id_kecamatan = {
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
    if (dapil === '3') {
      filter.id_kecamatan = {
        $in: [
          '5203050',
          '5203060',
          '5203070',
          '5203080',
          '5203090',
          '5203100',
          '5203051',
          '5203061',
          '5203091',
          '5203092',
          '5203081',
          '5203071',
        ],
      };
    }
    if (dapil === '5') {
      filter.id_kabupaten = { $in: ['5207', '5204'] };
    }
    if (dapil === '6') {
      filter.id_kabupaten = { $in: ['5206', '5272', '5205'] };
    }
    if (dapil === '7') {
      filter.id_kecamatan = {
        $in: ['5202060', '5202061', '5202040', '5202050', '5202090', '5202091'],
      };
    }
    if (dapil === '8') {
      filter.id_kecamatan = {
        $in: ['5202070', '5202020', '5202010', '5202030', '5202011', '5202080'],
      };
    }
    // console.log(filter);

    return this.pemilih.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'suaras',
          localField: '_id',
          foreignField: 'user_id',
          as: 'suara',
          pipeline: [
            {
              $match: filterChild,
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$suara',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'kabupatens',
          localField: 'id_kabupaten',
          foreignField: '_id',
          as: 'kabupaten',
        },
      },
      {
        $unwind: {
          path: '$kabupaten',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'kecamatans',
          localField: 'id_kecamatan',
          foreignField: '_id',
          as: 'kecamatan',
        },
      },
      {
        $unwind: {
          path: '$kecamatan',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'kelurahans',
          localField: 'id_kelurahan',
          foreignField: '_id',
          as: 'kelurahan',
        },
      },
      {
        $unwind: {
          path: '$kelurahan',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'id_category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'id_sub_category',
          foreignField: '_id',
          as: 'sub_category',
        },
      },
      {
        $unwind: {
          path: '$sub_category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'upas',
          localField: 'id_upa',
          foreignField: '_id',
          as: 'upa',
        },
      },
      {
        $unwind: {
          path: '$upa',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }

  async uploadPemilih(datas: any): Promise<any> {
    for (const data of datas) {
      const {
        nik,
        nama,
        gender,
        alamat,
        tps,
        id_category,
        id_sub_category,
        id_kabupaten,
        id_kecamatan,
        id_kelurahan,
        id_upa,
        id_dpr_level,
      } = data;
      console.log(data);
      const findPemilih: any = await this.pemilih.findOne({
        nik: nik.toString(),
      });
      if (findPemilih) {
        throw new BadRequestException('Nik Sudah Terdaftar');
      }
      const id_pemilih = new Types.ObjectId();
      const data_pemilih = {
        nama,
        nik: nik.toString(),
        gender,
        alamat,
        tps,
        id_category,
        id_sub_category,
        id_kabupaten: id_kabupaten ? id_kabupaten.toString() : '',
        id_kecamatan: id_kecamatan ? id_kecamatan.toString() : '',
        id_kelurahan: id_kelurahan ? id_kelurahan.toString() : '',
        id_upa: id_upa ? id_upa : '',
        _id: id_pemilih,
      };
      // delete data_pemilih.id_dpr_level;
      const created_pemilih = new this.pemilih(data_pemilih);
      created_pemilih.save();
      for (const el of JSON.parse(id_dpr_level)) {
        const data_suara = {
          _id: new Types.ObjectId(),
          user_id: id_pemilih,
          id_dpr_level: el,
        };
        const created_suara = new this.suara(data_suara);
        created_suara.save();
      }
    }
    return {};
  }
}
