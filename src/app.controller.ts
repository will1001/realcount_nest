import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReqBodyTargetDto } from './dto/target.dto';
import { ReqBodyPemilihDto } from './dto/pemilih.dto';
import { QuerySuaraDto } from './dto/suara.dto';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReqQueryUpaDto } from './dto/upa.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

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

  @Get('/pemilih')
  async getPemilih(@Query() query: ReqBodyPemilihDto): Promise<any> {
    return { data: await this.appService.getPemilih(query) };
  }

  @Get('/suara')
  async getSuara(@Query() query: QuerySuaraDto): Promise<any> {
    return { data: await this.appService.getSuara(query) };
  }

  @Post('register')
  async register(@Body() userData: RegisterUserDto): Promise<any> {
    const { username, id_kabupaten, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.appService.register({
      username,
      id_kabupaten,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(@Body() userData: LoginUserDto): Promise<any> {
    const { username, password } = userData;

    const user = await this.appService.isUsernameRegistered(username);

    if (!user[0]) {
      throw new UnauthorizedException('Username Tidak Terdaftar');
    }

    if (user[0] && (await bcrypt.compare(password, user[0].password))) {
      const payload = { id: user[0]._id, username: user[0].username };
      const accessToken = await this.jwtService.signAsync(payload);

      const loginResponse: any = {
        access_token: accessToken,
        user: {
          username: user[0]?.username,
          id_kabupaten: user[0]?.id_kabupaten,
          kabupaten: user[0]?.kabupaten ? user[0]?.kabupaten?.name : '',
        },
      };

      return loginResponse;
    }

    throw new UnauthorizedException('Password Salah');
  }

  @Get('/upa')
  async getUpa(@Query() query: ReqQueryUpaDto): Promise<any> {
    return { data: await this.appService.getUpa(query) };
  }
}
