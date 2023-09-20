import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
