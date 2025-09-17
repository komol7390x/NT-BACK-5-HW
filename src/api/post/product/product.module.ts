import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DBModule } from 'src/common/database/database.module';
import { ProductQueryService } from 'src/core/query/product-query-db';

@Module({
  imports: [DBModule],
  controllers: [ProductController],
  providers: [ProductService, ProductQueryService],
})
export class ProductModule {}
