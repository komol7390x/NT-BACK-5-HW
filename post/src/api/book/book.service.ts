import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) { }
  // ------------------------- CREATE -------------------------

  async create(dto: CreateBookDto) {
    const data = await this.prisma.book.create({ data: { ...dto } })
    return data
  }
  // ------------------------- FIND ALL -------------------------

  async findAll() {
    return await this.prisma.book.findMany({ orderBy: { id: 'desc' } })
  }

  // ------------------------- FIND ONE -------------------------

  async findOne(id: number) {
    const data = await this.prisma.book.findUnique({ where: { id } })
    if (!data) {
      throw new NotFoundException(`not found user id => ${id}`)
    }
    return data
  }

  // ------------------------- UPDATE -------------------------

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id)
    const data = await this.prisma.book.update({ where: { id }, data: { ...dto } })
    return data
  }

  // ------------------------- DELETE -------------------------

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.book.delete({ where: { id } })
    return {}
  }
}
