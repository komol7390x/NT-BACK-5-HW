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
import { CreateGame1Dto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Game3')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  // -------------------------- CREATE USER --------------------------

  @ApiOperation({ summary: 'New user' })
  @Post()
  newUser(@Body() create: CreateGame1Dto) {
    return this.gameService.create(create);
  }

  // -------------------------- CREATE GAME --------------------------
  @ApiOperation({ summary: 'New Game' })
  @Post('')
  newGame(@Body() create: CreateGame1Dto) {
    return this.gameService.create(create);
  }
}
