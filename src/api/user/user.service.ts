import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  // ----------------- CREATE-----------------
  async create(createUserInput: CreateUserInput) {
    const { email, password, age, name } = createUserInput
    const existEmail = await this.prisma.user.findFirst({ where: { email } })
    if (existEmail) {
      throw new ConflictException(`this email ${email} already exist`)
    }
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        age,
      },
    });
  }
  // ----------------- FIND ALL-----------------

  async findAll() {
    return await this.prisma.user.findMany({ include: { post: true }, take: 100 })
  }
  // ----------------- FIND ONE-----------------

  async findOne(id: number) {
    const data = await this.prisma.user.findUnique({ where: { id }, include: { post: true } })
    if (!data) {
      throw new NotFoundException(`not found this id => ${id} on user`)
    }
    return { message: 'success', data }
  }
  // ----------------- UPDATE-----------------

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.findOne(id)
    const { email } = updateUserInput
    if (email) {
      const existEmail = await this.prisma.user.findFirst({ where: { email } })
      if (existEmail) {
        throw new ConflictException(`this email ${email} already exist`)
      }
    }
    return await this.prisma.user.update({ where: { id }, data: { ...updateUserInput } })
  }
  // ----------------- DELETE-----------------

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.user.delete({ where: { id } })
    return { message: 'success', data: {} }

  }
}
