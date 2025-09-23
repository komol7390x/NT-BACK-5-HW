import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StartGameDto } from './dto/make-game.dto';
import { MakeGuessDto } from './dto/make-guess.dto';

@ApiTags('Game3')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  // ----------------------- CREATE USER -----------------------

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.gameService.createUser(dto.name);
  }
  // ----------------------- CREATE GAME -----------------------

  @Post('games/start/:userId')
  startGame(@Param('userId') userId: string, @Body() dto: StartGameDto) {
    return this.gameService.startGame(Number(userId), dto);
  }
  // ----------------------- GAMES -----------------------

  @Post('games/guess/:gameId')
  makeGuess(@Param('gameId') gameId: string, @Body() dto: MakeGuessDto) {
    return this.gameService.makeGuess(Number(gameId), dto.value);
  }
  // ----------------------- HISTORY -----------------------

  @Get('games/:gameId')
  getGameHistory(@Param('gameId') gameId: string) {
    return this.gameService.getGameHistory(Number(gameId));
  }
}
