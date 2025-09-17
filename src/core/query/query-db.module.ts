import { Module } from '@nestjs/common';
import { AdminQueryService } from './query-db';
import { DBModule } from 'src/common/database/database.module';

@Module({
  imports: [DBModule],
  providers: [AdminQueryService],
  exports: [AdminQueryService],
})
export class QueryDBModule {}
