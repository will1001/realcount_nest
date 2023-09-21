import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ReqBodyTargetDto } from './dto/target.dto';
import { ReqBodyPemilihDto } from './dto/pemilih.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/dapil')
  async getDapil(): Promise<any> {
    return { data: await this.appService.getDapil() };
  }

  @Get('/target')
  async getTarget(): Promise<any> {
    return { data: await this.appService.getTarget() };
  }

  @Post('/target')
  postTarget(@Body() body: ReqBodyTargetDto): any {
    return this.appService.postTarget(body);
  }

  @Get('/kabupaten')
  async getKabupaten(): Promise<any> {
    return { data: await this.appService.getKabupaten() };
  }

  @Get('/category')
  async getCategory(): Promise<any> {
    return { data: await this.appService.getCategory() };
  }

  @Get('/sub_category/:category_id')
  async getSubCategory(
    @Param('category_id') category_id: number,
  ): Promise<any> {
    return { data: await this.appService.getSubCategory(category_id) };
  }

  @Get('/kecamatan/:id_kabupten')
  async getKecamatan(@Param('id_kabupten') id_kabupten: String): Promise<any> {
    return { data: await this.appService.getKecamatan(id_kabupten) };
  }

  @Get('/kelurahan/:id_kecamatan')
  async getKelurahan(
    @Param('id_kecamatan') id_kecamatan: String,
  ): Promise<any> {
    return { data: await this.appService.getKelurahan(id_kecamatan) };
  }

  @Get('/dpr_level')
  async getDprLevel(): Promise<any> {
    return { data: await this.appService.getDprLevel() };
  }

  @Post('/pemilih')
  postPemilih(@Body() body: ReqBodyPemilihDto): any {
    return this.appService.postPemilih(body);
  }
}
