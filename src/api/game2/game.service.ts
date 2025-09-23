import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { date } from 'joi';
import { PrismaService } from 'src/database/prisma.db';

@Injectable()
export class GameService2 {
  constructor(private prisma: PrismaService) {}
  // ----------------------- CREATE USER -----------------------
  async createUser(name: string) {
    const exist = await this.prisma.user2.findFirst({ where: { name } });
    if (exist) {
      throw new ConflictException(`this name ${name} already exist`);
    }
    return await this.prisma.user2.create({ data: { name } });
  }

  // ----------------------- CREATE QUESTION -----------------------
  async createQuestion(question: string, answer: string) {
    const answerLowerCase = answer.toLowerCase();
    return await this.prisma.question2.create({
      data: { question, answer: answerLowerCase },
    });
  }

  // ----------------------- ANSWER QUESTION -----------------------
  async answerQuestion(answer: string, userId: number, questionId: number) {
    const answerLowerCase = answer.toLowerCase();
    const question = await this.prisma.question2.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      throw new NotFoundException(
        `Not found this id => ${question} on question`,
      );
    }
    const user = await this.prisma.user2.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Not found user id ${userId} on User`);
    }
    if (question.answer == answerLowerCase) {
      await this.prisma.user2.update({
        where: { id: userId },
        data: { score: { increment: 1 } },
      });
      return {
        message: 'success',
        data: answer,
      };
    } else {
      return {
        message: 'not found',
        statusCode: 404,
      };
    }
  }
  // ----------------------- RANDOM QUESTION -----------------------
  async randomQuestion() {
    const questionAsk = await this.prisma.question2.findMany();

    const random = Math.floor(Math.random() * questionAsk.length);

    const data = questionAsk[random];

    if (!data) {
      throw new NotFoundException(`not found ask`);
    }
    return { id: data.id, question: data.question };
  }
  // ----------------------- TOP USER -----------------------
  async topUser() {
    const topUser = await this.prisma.user2.findMany({
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
