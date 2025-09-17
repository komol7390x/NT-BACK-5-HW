import { Module } from '@nestjs/common';
import { AdminQueryService } from './admin-query-db';
import { DBModule } from 'src/common/database/database.module';
import { SallerQueryService } from './saller-query-db';
import { ProductQueryService } from './product-query-db';

@Module({
  imports: [DBModule],
  providers: [AdminQueryService, SallerQueryService, ProductQueryService],
  exports: [AdminQueryService, SallerQueryService, ProductQueryService],
})
export class QueryDBModule {}
