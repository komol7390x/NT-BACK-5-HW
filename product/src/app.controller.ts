import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @GrpcMethod('ProductService', 'CreateProduct')
  create(@Payload() dto: CreateProductDto) {
    return this.appService.create(dto);
  }

  @GrpcMethod('ProductService', 'FindByStoreId')
  async findAll(data: { storeId: number }) {
    const products = await this.appService.findByStoreId(data);
    return { products };
  }
}
