import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto1 } from './dto/create-user.dto';
import { CreateWordDto1 } from './dto/create-word.dto';
import { AnswerQuestionDto1 } from './dto/answer.dto';
import { GameService1 } from './game.service';

@ApiTags('Game1')
@Controller('word')
export class GameController1 {
  constructor(private readonly gameService: GameService1) {}
  // ----------------------- CREATE USER -----------------------

  @Post('users')
  createUser(@Body() dto: CreateUserDto1) {
    return this.gameService.createUser(dto.name);
  }

  // ----------------------- CREATE WORD -----------------------

  @Post('create')
  createQuestion(@Body() dto: CreateWordDto1) {
    return this.gameService.createWord(dto.word);
  }
  // ----------------------- ASK QUESTION -----------------------

  @Post('answer/:userId/:questionId')
  answerQuestion(
    @Body() dto: AnswerQuestionDto1,
    @Param('userId') userId: number,
    @Param('questionId') questionId: number,
  ) {
    return this.gameService.answerQuestion(dto.answer, userId, questionId);
  }

  // ----------------------- RANDOM WORD -----------------------
  @Get('random')
  randomWord() {
    return this.gameService.askRandomWord();
  }
  // ----------------------- TOP USER -----------------------

  @Get('users/leaderboard')
  getTopUser() {
    return this.gameService.topUser();
  }
}
