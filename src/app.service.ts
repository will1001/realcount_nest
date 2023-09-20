import { Injectable } from '@nestjs/common';
import { Dapil } from './schemas/dapil.schema';
import { TargetSuara } from './schemas/targetSuara.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Dapil.name) private dapilModel: Model<Dapil>,
    @InjectModel(TargetSuara.name) private targetSuara: Model<TargetSuara>,
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
}
