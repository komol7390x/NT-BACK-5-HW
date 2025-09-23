import { Module } from '@nestjs/common';
import { GameService2 } from './game.service';
import { GameController2 } from './game.controller';

@Module({
  controllers: [GameController2],
  providers: [GameService2],
})
export class GameModule2 {}
