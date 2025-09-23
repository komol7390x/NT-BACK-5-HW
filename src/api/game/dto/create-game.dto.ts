import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GameCreateDto {
  @ApiProperty({ type: 'number', description: 'Gamer ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  gameId: number;
}
