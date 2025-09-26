import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({ data: createUserInput })
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.findOne(id)
    return await this.prisma.user.update({ where: { id }, data: { ...updateUserInput } })
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.user.delete({ where: { id } })
    return {}
  }
}
