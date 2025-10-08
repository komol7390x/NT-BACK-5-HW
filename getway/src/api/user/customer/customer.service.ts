import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';



@Injectable()
export class CustomerService {
  private customerService: ClientProxy
  constructor() {
    this.customerService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3001 }
    })
  }
  create(dto: CreateCustomerDto) {
    return this.customerService.send('createCustomer', dto)
  }

  findAll() {
    return this.customerService.send('findAllCustomer', {})
  }

  findOne(id: number) {
    return this.customerService.send('findOneCustomer', id)
  }

  update(id: number, dto: UpdateCustomerDto) {
    return this.customerService.send('updateCustomer', id);
  }

  remove(id: number) {
    return this.customerService.send('removeCustomer', id)
  }
}
