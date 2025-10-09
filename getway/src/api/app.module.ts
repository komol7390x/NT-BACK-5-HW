import { Module } from '@nestjs/common';
import { CustomerModule } from './user/customer/customer.module';
import { BookModule } from './post/book/book.module';

@Module({
  imports: [
    CustomerModule,
    BookModule
  ],
})
export class AppModule { }
