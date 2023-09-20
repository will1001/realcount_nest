import { Controller, Get, Post, Body ,Param} from '@nestjs/common';
import { AppService } from './app.service';
import { ReqBodyTargetDto } from './dto/target.dto';

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
}
