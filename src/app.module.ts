import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dapil, DapilSchema } from './schemas/dapil.schema';
import { TargetSuara, TargetSuaraSchema } from './schemas/targetSuara.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}/${process.env.DB_NAME}?authMechanism=DEFAULT`,
    ),
    MongooseModule.forFeature([
      { name: Dapil.name, schema: DapilSchema },
      { name: TargetSuara.name, schema: TargetSuaraSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
