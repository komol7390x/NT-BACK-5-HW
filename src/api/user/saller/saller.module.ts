import { Module } from '@nestjs/common';
import { SallerService } from './saller.service';
import { SallerController } from './saller.controller';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';
import { SallerQueryService } from 'src/core/query/saller-query-db';
import { DBModule } from 'src/common/database/database.module';

@Module({
  imports: [DBModule],
  controllers: [SallerController],
  providers: [SallerService, CryptoService, SallerQueryService],
})
export class SallerModule {}
