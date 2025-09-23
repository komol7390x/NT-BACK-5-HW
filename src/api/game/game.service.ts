import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGame1Dto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.db';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}
  // ------------------ CREATE ------------------
  async create(create: CreateGame1Dto) {
    const { name } = create;
    const exist = await this.prisma.user.findFirst({ where: { name } });
    if (exist) {
      throw new ConflictException(`This is name ${name} already exist`);
    }
    const data = await this.prisma.user.create({ data: create });
    return {
      message: 'success',
      statusCode: 201,
      data,
    };
  }
}
