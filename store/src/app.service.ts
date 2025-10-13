import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { PrismaClient } from 'generated/prisma';
import { Client, type ClientGrpc, RpcException, Transport } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';

interface ProductService {
  FindByStoreId(data: any): any
}

@Injectable()
export class AppService {
  private prisma = new PrismaClient();

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
    this.productService = this.productClient.getService<ProductService>('ProductService');
  }


  async create(dto: CreateStoreDto) {
    const existsStore = await this.prisma.store.findUnique({
      where: { name: dto.name }
    });
    if (existsStore) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Store already exists'
      });
    }
    const store = await this.prisma.store.create({
      data: dto,
    });
    return store;
  }

  async findOne({ id }: { id: number }) {
    try {
      const store = await this.prisma.store.findUnique({
        where: { id }
      });
      if (!store) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'Store not found'
        });
      }
      const products: any = await lastValueFrom(this.productService.FindByStoreId({ storeId: id }));
      return { store, products: products.products ?? [], };
    } catch (error) {
      throw new RpcException({
        code: error.code ?? status.INTERNAL,
        message: error.details ?? 'Product service bilan aloqa xatosi',
      });
    }
  }
}
