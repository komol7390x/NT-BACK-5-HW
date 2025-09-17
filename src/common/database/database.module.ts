import { Module } from '@nestjs/common';
import { DBService } from './connect.database';

@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
