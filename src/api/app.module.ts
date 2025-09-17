import { Module } from '@nestjs/common';
import { AdminModule } from './user/admin/admin.module';
import { SallerModule } from './user/saller/saller.module';
import { ProductModule } from './post/product/product.module';
import { DBService } from 'src/common/database/connect.database';


@Module({
  imports: [AdminModule, SallerModule, ProductModule],
  providers: [DBService],
  exports: [DBService]
})
export class AppModule { }