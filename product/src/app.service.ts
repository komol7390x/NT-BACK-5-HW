import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { Client, type ClientGrpc, RpcException, Transport } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';

interface StoreService {
  FindOne(data: any): any;
}

@Injectable()
export class AppService implements OnModuleInit {
  private prisma = new PrismaClient();

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

  onModuleInit() {
    this.storeService = this.storeClient.getService<StoreService>('StoreService');
  }

  async create(dto: CreateProductDto) {
    try {
      await lastValueFrom(this.storeService.FindOne({ id: dto.storeId }));
      const product = await this.prisma.product.create({
        data: dto
      });
      return product;
    } catch (error) {
      throw new RpcException({
        code: error.code ?? status.INTERNAL,
        message: error.details ?? 'Store service bilan aloqa xatosi',
      });
    }
  }

  async findByStoreId({ storeId }: { storeId: number }) {
    const products = await this.prisma.product.findMany({
      where: { storeId }
    });
    return products;
  }
}
