import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { BorrowEntity } from 'src/core/entity/book/borrow-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/api/user/user/user.service';
import { BookService } from '../book/book.service';
import { config } from 'src/config/env-config';
import { TransactionService } from 'src/infrastructure/transaction/Transaction';

@Injectable()
export class BorrowService extends BaseService<
  CreateBorrowDto,
  UpdateBorrowDto,
  BorrowEntity
> {
  constructor(
    // borrow
    @InjectRepository(BorrowEntity)
    private readonly borrowRepo: Repository<BorrowEntity>,

    // book
    private readonly book: BookService,

    // user
    private readonly user: UserService,

    // transaction
    private readonly transaction:TransactionService
  ) {
    super(borrowRepo);
  }

  // ------------------------- CREATE -------------------------
  async createBorrow(createDto: CreateBorrowDto) {
    const { user_id,book_id,return_date,...rest } = createDto;

    // check id
    await this.user.findOneById(user_id)
    const {data}=await this.book.findOneById(book_id)

    // check date
    if(!data[0].avialable){
      throw new ConflictException(`this book => ${data[0].title} is not avialable`)
    }

    // check date
    const borrow_date=new Date().toISOString().split('T')[0]
    const due_date=this.checkRetrunDate(return_date)
    
    const result={
      borrow_date,
      due_date,
      return_date,
      user_id,
      book_id
    }    

    await this.transaction.createTransaction(result)
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

    // ------------------------- CHECK DATE -------------------------
    checkRetrunDate(date:string):string{
      const checkDate=new Date(date).getTime()
      const dueDate=new Date().getTime()+(Number(config.BORROW_TIME)*24*60*60*1000)
      
      const due_date=new Date(dueDate).toISOString().split('T')[0]

      if(checkDate>dueDate){
        throw new BadRequestException(`You max borrow Book ${config.BORROW_TIME}=> Time: ${due_date}`)
      }

      return due_date
    }

}
