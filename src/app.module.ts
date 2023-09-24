import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dapil, DapilSchema } from './schemas/dapil.schema';
import { TargetSuara, TargetSuaraSchema } from './schemas/targetSuara.schema';
import { ConfigModule } from '@nestjs/config';
import { Kabupaten, KabupatenSchema } from './schemas/kabupaten.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { SubCategory, SubCategorySchema } from './schemas/subCategory.schema';
import { Kecamatan, KecamatanSchema } from './schemas/kecamatan.schema';
import { Kelurahan, KelurahanSchema } from './schemas/kelurahan.schema';
import { Pemilih, PemilihSchema } from './schemas/pemilih.schema';
import { Suara, SuaraSchema } from './schemas/suara.schema';
import { DprLevel, DprLevelSchema } from './schemas/dprLevel.schema';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Upa, UpaSchema } from './schemas/upa.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '900s' },
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}/${process.env.DB_NAME}?authMechanism=DEFAULT`,
    ),
    MongooseModule.forFeature([
      { name: Dapil.name, schema: DapilSchema },
      { name: TargetSuara.name, schema: TargetSuaraSchema },
      { name: Kabupaten.name, schema: KabupatenSchema },
      { name: Kecamatan.name, schema: KecamatanSchema },
      { name: Kelurahan.name, schema: KelurahanSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Pemilih.name, schema: PemilihSchema },
      { name: Suara.name, schema: SuaraSchema },
      { name: DprLevel.name, schema: DprLevelSchema },
      { name: User.name, schema: UserSchema },
      { name: Upa.name, schema: UpaSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
