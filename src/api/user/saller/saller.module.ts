import { Module } from '@nestjs/common';
import { SallerService } from './saller.service';
import { SallerController } from './saller.controller';

@Module({
  controllers: [SallerController],
  providers: [SallerService],
})
export class SallerModule {}
