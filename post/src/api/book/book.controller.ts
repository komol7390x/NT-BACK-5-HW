import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('createBook')
  create(@Payload() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @MessagePattern('findAllBook')
  findAll() {
    return this.bookService.findAll();
  }

  @MessagePattern('findOneBook')
  findOne(@Payload() id: number) {
    return this.bookService.findOne(id);
  }

  @MessagePattern('updateBook')
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern('removeBook')
  remove(@Payload() id: number) {
    return this.bookService.remove(id);
  }
}
