import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GameService2 } from './game.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto2 } from './dto/create-user.dto';
import { CreateQuestionDto } from './dto/question-answer.dt';
import { AnswerQuestionDto } from './dto/answer.dto';

@ApiTags('Game2')
@Controller('question')
export class GameController2 {
  constructor(private readonly gameService: GameService2) {}
  // ----------------------- CREATE USER -----------------------

  @Post('users')
  createUser(@Body() dto: CreateUserDto2) {
    return this.gameService.createUser(dto.name);
  }

  // ----------------------- CREATE QUESTION -----------------------

  @Post('create')
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.gameService.createQuestion(dto.question, dto.answer);
  }
  // ----------------------- ASK QUESTION -----------------------

  @Post('answer/:userId/:questionId')
  answerQuestion(
    @Body() dto: AnswerQuestionDto,
    @Param('userId') userId: number,
    @Param('questionId') questionId: number,
  ) {
    return this.gameService.answerQuestion(dto.answer, userId, questionId);
  }
  // ----------------------- GET QUESTION -----------------------

  @Get('random')
  getQuetion() {
    return this.gameService.randomQuestion();
  }
  // ----------------------- TOP USER -----------------------

  @Get('users/leaderboard')
  getTopUser() {
    return this.gameService.topUser()
  }
}
