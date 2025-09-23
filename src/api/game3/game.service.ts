import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.db';
import { StartGameDto3 } from './dto/make-game.dto';

@Injectable()
export class GameService3 {
  constructor(private prisma: PrismaService) {}
  // ----------------------- CREATE USER -----------------------
  async createUser(name: string) {
    const exist = await this.prisma.user3.findFirst({ where: { name } });
    if (exist) {
      throw new ConflictException(`this name ${name} already exist`);
    }
    return this.prisma.user3.create({ data: { name } });
  }
  // ----------------------- CREATE GAME -----------------------

  async startGame(userId: number, dto: StartGameDto3) {
    const { maxAttempts, maxRange, minRange } = dto;

    if (minRange >= maxRange) {
      throw new BadRequestException('min number must be less than max range');
    }

    const randomNumber =
      Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    return this.prisma.game3.create({
      data: {
        userId,
        number: randomNumber,
        minRange,
        maxRange,
        maxAttempts,
      },
    });
  }
  // ----------------------- GAMES -----------------------

  async makeGuess(gameId: number, value: number) {
    const game = await this.prisma.game3.findUnique({
      where: { id: gameId },
      include: { guesses: true },
    });
    if (!game) throw new NotFoundException('Game not found');

    const { maxAttempts, finished, number, attempts } = game;

    if (finished) throw new BadRequestException('Game already finished');

    // check attempts
    if (attempts >= maxAttempts) {
      throw new BadRequestException('Not attempts');
    }

    let result: string;

    if (value === number) {
      // true
      result = "to'g'ri";
      await this.prisma.game3.update({
        where: { id: gameId },
        data: { finished: true, attempts: { increment: 1 } },
      });
      // less
    } else if (value < number) {
      result = 'kichik';
      await this.prisma.game3.update({
        where: { id: gameId },
        data: { attempts: { increment: 1 } },
      });

      // big
    } else {
      result = 'katta';
      await this.prisma.game3.update({
        where: { id: gameId },
        data: { attempts: { increment: 1 } },
      });
    }

    return this.prisma.guess3.create({
      data: {
        gameId,
        value,
        result,
      },
    });
  }
  // ----------------------- HISTORY -----------------------

  async getGameHistory(gameId: number) {
    return this.prisma.game3.findUnique({
      where: { id: gameId },
      include: { guesses: true },
    });
  }
}
