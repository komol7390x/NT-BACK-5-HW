import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService3 } from './game.service';
import { CreateUserDto3 } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { StartGameDto3 } from './dto/make-game.dto';
import { MakeGuessDto3 } from './dto/make-guess.dto';

@ApiTags('Game3')
@Controller('game')
export class GameController3 {
  constructor(private readonly gameService: GameService3) {}
  // ----------------------- CREATE USER -----------------------

  @Post('users')
  createUser(@Body() dto: CreateUserDto3) {
    return this.gameService.createUser(dto.name);
  }
  // ----------------------- CREATE GAME -----------------------

  @Post('games/start/:userId')
  startGame(@Param('userId') userId: string, @Body() dto: StartGameDto3) {
    return this.gameService.startGame(Number(userId), dto);
  }
  // ----------------------- GAMES -----------------------

  @Post('games/guess/:gameId')
  makeGuess(@Param('gameId') gameId: string, @Body() dto: MakeGuessDto3) {
    return this.gameService.makeGuess(Number(gameId), dto.value);
  }
  // ----------------------- HISTORY -----------------------

  @Get('games/:gameId')
  getGameHistory(@Param('gameId') gameId: string) {
    return this.gameService.getGameHistory(Number(gameId));
  }
}
