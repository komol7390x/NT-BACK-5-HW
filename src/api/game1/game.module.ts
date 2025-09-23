import { Module } from '@nestjs/common';
import { GameController1 } from './game.controller';
import { GameService1 } from './game.service';

@Module({
  controllers: [GameController1],
  providers: [GameService1],
})
export class GameModule1 {}
