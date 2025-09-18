import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "src/common/enum/action";
import { BookEntity } from "src/core/entity/book/book-entity";
import { BookHistoryEntity } from "src/core/entity/book/book-history-entity";
import { BorrowEntity } from "src/core/entity/book/borrow-entity";
import { Repository, DataSource } from "typeorm";
import { Transactional } from 'typeorm-transactional'

@Injectable()
export class TransactionService {
    constructor(

        // history
        @InjectRepository(BookHistoryEntity)
        private readonly bookHistory: Repository<BookHistoryEntity>,

        // book
        @InjectRepository(BookEntity)
        private readonly book: Repository<BookEntity>,

        //
        @InjectRepository(BorrowEntity)
        private readonly borrow: Repository<BorrowEntity>,

    ) { }

    @Transactional()
    async createTransaction(data: {
        borrow_date: string,
        due_date: string,
        return_date: string,
        user_id: number,
        book_id: number
    }) {
        const { user_id, book_id, borrow_date } = data
        const history = {
            date: borrow_date,
            user_id,
            book_id,
            action: Action.BORROW
        }
        await this.book.update({ id: data.book_id }, { avialable: false })
        await this.borrow.save(data)
        await this.bookHistory.save(history)
    }
}