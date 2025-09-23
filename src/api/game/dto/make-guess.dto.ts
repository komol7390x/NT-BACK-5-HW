import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MakeGuessDto {
  @ApiProperty({ type: 'number', description: 'Number', example: 20 })
  @IsInt()
  value: number;
}
