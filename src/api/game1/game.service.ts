import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import shuffle from 'shuffle-words';

@Injectable()
export class GameService1 {
  constructor(private prisma: PrismaService) {}
  // ----------------------- CREATE USER -----------------------
  async createUser(name: string) {
    const exist = await this.prisma.user1.findFirst({ where: { name } });
    if (exist) {
      throw new ConflictException(`this name ${name} already exist`);
    }
    return await this.prisma.user1.create({ data: { name } });
  }

  // ----------------------- CREATE WORD -----------------------
  async createWord(word: string) {
    return await this.prisma.word1.create({ data: { text: word } });
  }
  // ----------------------- RESULT GAME-----------------------

  async answerQuestion(word: string, userId: number, questionId: number) {
    const question = await this.prisma.word1.findFirst({
      where: { text: word },
    });
    if (!question) {
      throw new ConflictException(`it in not true ${word} :(`);
    } else {
      const user = await this.prisma.user1.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`not found this user ${userId} on user`);
      }
      const data = await this.prisma.user1.update({
        where: { id: userId },
        data: { score: { increment: 1 } },
      });
      return {
        message: 'success',
        data,
      };
    }
  }
  // ----------------------- PLAY GAME-----------------------
  async askRandomWord() {
    const word = await this.prisma.word1.findMany();

    const random = Math.floor(Math.random() * word.length);
    const mixWord = shuffle(word[random].text, { copy: true });

    if (!mixWord) {
      throw new NotFoundException('not found random word');
    }
    return {
      id: word[random].id,
      mixWord,
    };
  }
  // ----------------------- TOP USER -----------------------
  async topUser() {
    const topUser = await this.prisma.user1.findMany({
      take: 10,
      orderBy: {
        score: 'desc',
      },
    });

    return {
      data: topUser,
    };
  }
}
