import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) { }
  // ------------------------- CREATE -------------------------

  async create(dto: CreateCustomerDto) {
    const { email } = dto
    const existEmail = await this.prisma.customer.findUnique({ where: { email } })
    if (existEmail) {
      throw new ConflictException(`this email ${email} already exist `)
    }
    const data = await this.prisma.customer.create({ data: { ...dto } })
    return data
  }
  // ------------------------- FIND ALL -------------------------

  async findAll() {
    return await this.prisma.customer.findMany({ orderBy: { id: 'desc' } })
  }

  // ------------------------- FIND ONE -------------------------

  async findOne(id: number) {
    const data = await this.prisma.customer.findUnique({ where: { id } })
    if (!data) {
      throw new NotFoundException(`not found user id => ${id}`)
    }
    return data
  }

  // ------------------------- UPDATE -------------------------

  async update(id: number, dto: UpdateCustomerDto) {
    await this.findOne(id)
    const { email } = dto
    if (email) {
      const existEmail = await this.prisma.customer.findUnique({ where: { email } })
      if (existEmail) {
        throw new ConflictException(`this email ${email} already exist `)
      }
    }
    const data = await this.prisma.customer.update({ where: { id }, data: { ...dto } })
    return data
  }

  // ------------------------- DELETE -------------------------

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.customer.delete({ where: { id } })
    return {}
  }
}
