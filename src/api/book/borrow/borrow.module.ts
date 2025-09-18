import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from 'src/core/entity/book/borrow-entity';

@Module({
  imports:[TypeOrmModule.forFeature([BorrowEntity])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
