import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('Book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiOperation({ summary: 'Book create' })
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Book findall' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Book findone' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Book update' })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Book delete' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
