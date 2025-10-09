import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class BookService {
  private bookService: ClientProxy
  constructor() {
    this.bookService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3002 }
    })
  }
  create(dto: CreateBookDto) {
    return this.bookService.send('createBook', dto)
  }

  findAll() {
    return this.bookService.send('findAllBook', {})
  }

  findOne(id: number) {
    return this.bookService.send('findOneBook', id)
  }

  update(id: number, dto: UpdateBookDto) {
    return this.bookService.send('updateBook', { ...dto, id })
  }

  remove(id: number) {
    return this.bookService.send('removeBook', id)
  }
}
