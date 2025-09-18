import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { BorrowEntity } from 'src/core/entity/book/borrow-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BorrowService extends BaseService<
  CreateBorrowDto,
  UpdateBorrowDto,
  BorrowEntity
> {
  constructor(
    @InjectRepository(BorrowEntity)
    private readonly borrowRepo: Repository<BorrowEntity>,
  ) {
    super(borrowRepo);
  }

  // ------------------------- CREATE -------------------------
  async createBorrow(createDto: CreateBorrowDto) {
    const { borrow_date, due_date } = createDto;

    const exist = await this.borrowRepo.findOne({
      where: { borrow_date, due_date },
    });

    if (exist) {
      throw new ConflictException(
        `borrow_date ${borrow_date} and due_date ${due_date} already exists`,
      );
    }

    return super.create(createDto);
  }

  // ------------------------- UPDATE -------------------------
  async updateBorrow(id: number, updateDto: UpdateBorrowDto) {
    const { borrow_date, due_date } = updateDto;

    if (borrow_date && due_date) {
      const exist = await this.borrowRepo.findOne({
        where: { borrow_date, due_date },
      });

      if (exist && exist.id !== id) {
        throw new ConflictException(
          `borrow_date ${borrow_date} and due_date ${due_date} already exists`,
        );
      }
    }

    return super.update(id, updateDto);
  }
}
