import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @GrpcMethod('StoreService', 'CreateStore')
  create(@Payload() dto: CreateStoreDto) {
    return this.appService.create(dto);
  }

  @GrpcMethod('StoreService', 'FindOne')
  findOne(data: { id: number }) {
    return this.appService.findOne(data);
  }
}
