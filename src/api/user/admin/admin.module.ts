import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { QueryDBModule } from 'src/core/query/query-db.module';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';

@Module({
  imports:[QueryDBModule],
  controllers: [AdminController],
  providers: [AdminService,CryptoService],
})
export class AdminModule {}