import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookHistoryEntity } from 'src/core/entity/book/book-history-entity';
import { ISuccessRes } from 'src/infrastructure/success-res/success-interface';
import { successRes } from 'src/infrastructure/success-res/success-res';
import { Repository } from 'typeorm';

@Controller('stats')
export class StatisticaController {
  constructor(
    @InjectRepository(BookHistoryEntity)
    private readonly history: Repository<BookHistoryEntity>,
  ) {}
  // --------------------- TOP BOOKS ---------------------
  @Get('top-books')
  async topBook(): Promise<ISuccessRes> {
    const result = await this.history
      .createQueryBuilder('history')
      .innerJoin('history.user', 'user')
      .where('user.role = :role', { role: 'READER' })
      .select([
        'user.id AS userId',
        'user.email AS email',
        'COUNT(history.id) AS totalBorrows',
      ])
      .groupBy('user.id')
      .addGroupBy('user.email')
      .orderBy('totalBorrows', 'DESC')
      .limit(1)
      .getRawOne();

    return successRes(result);
  }

  // --------------------- TOP USER ---------------------

  @Get('top-user')
  topUser() {}
}
