import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  // ----------------- CREATE-----------------
  async create(createUserInput: CreatePostInput) {
    const { title, description, price, quantity, userId } = createUserInput
    const existTitle = await this.prisma.post.findFirst({ where: { title } })
    if (existTitle) {
      throw new ConflictException(`this title ${title} already exist on Post`)
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`not found user ${userId} on User`)
    }
    return await this.prisma.post.create({
      data: {
        userId,
        title,
        description,
        price,
        quantity,
      },
    });
  }
  // ----------------- FIND ALL-----------------

  async findAll() {
    return await this.prisma.post.findMany({ include: { User: true }, take: 100 })
  }
  // ----------------- FIND ONE-----------------

  async findOne(id: number) {
    const data = await this.prisma.post.findUnique({ where: { id }, include: { User: true } })
    if (!data) {
      throw new NotFoundException(`not found this id => ${id} on Post`)
    }
    return { message: 'success', data }
  }
  // ----------------- UPDATE-----------------

  async update(id: number, updateUserInput: UpdatePostInput) {
    await this.findOne(id)
    const { title, userId } = updateUserInput
    if (title) {
      const existTitle = await this.prisma.post.findFirst({ where: { title } })
      if (existTitle) {
        throw new ConflictException(`this title ${title} already exist`)
      }
    }
    if (userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        throw new NotFoundException(`not found user ${userId} on User`)
      }
    }
    return await this.prisma.post.update({ where: { id }, data: { ...updateUserInput } })
  }
  // ----------------- DELETE-----------------

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.post.delete({ where: { id } })
    return { message: 'success', data: {} }

  }
}
