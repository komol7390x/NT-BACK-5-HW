import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, type ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';

interface StoreService {
  CreateStore(data: any): any;
  FindAll(data: any): any;
  FindOne(data: any): any;
  UpdateStore(data: any): any;
  Remove(data: any): any;
}

interface ProductService {
  CreateProduct(data: any): any;
  FindAll(data: any): any;
  FindOne(data: any): any;
  UpdateProduct(data: any): any;
  Remove(data: any): any;
}

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'store',
      protoPath: join(process.cwd(), '..', 'store', 'proto', 'store.proto'),
      url: '0.0.0.0:50051'
    }
  })
  private storeClient: ClientGrpc;

  private storeService: StoreService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(process.cwd(), '..', 'product', 'proto', 'product.proto'),
      url: '0.0.0.0:50052'
    }
  })
  private productClient: ClientGrpc;

  private productService: ProductService;

  onModuleInit() {
    this.storeService = this.storeClient.getService<StoreService>('StoreService');
    this.productService = this.productClient.getService<ProductService>('ProductService');
  }

  async createStore(dto: any){
    return this.storeService.CreateStore(dto);
  }

  async createProduct(dto: any){
    return this.productService.CreateProduct(dto);
  }
}
