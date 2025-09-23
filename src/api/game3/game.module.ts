import { Module } from '@nestjs/common';
import { GameService3 } from './game.service';
import { GameController3 } from './game.controller';

@Module({
  controllers: [GameController3],
  providers: [GameService3],
})
export class GameModule3 {}
