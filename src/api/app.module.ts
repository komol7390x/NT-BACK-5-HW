import { Module } from '@nestjs/common';
import { GameModule3 } from './game3/game.module';
import { PrismaModule } from 'src/database/prisma.module';
import { GameModule2 } from './game2/game.module';

@Module({
  imports: [GameModule2, GameModule3, PrismaModule],
})
export class AppModule {}
