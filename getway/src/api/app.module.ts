import { Module } from '@nestjs/common';
import { CustomerModule } from './user/customer/customer.module';

@Module({
  imports: [CustomerModule],
})
export class AppModule { }
