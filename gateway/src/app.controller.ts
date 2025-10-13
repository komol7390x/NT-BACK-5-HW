import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('store')
  createStore(@Body() dto: any) {
    return this.appService.createStore(dto);
  }

  @Post('product')
  createProduct(@Body() dto: any) {
    return this.appService.createProduct(dto);
  }
}
