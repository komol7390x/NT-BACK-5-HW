import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWordDto1 {
  @ApiProperty({ type: 'string', description: 'Random word', example: 'moon' })
  @IsString()
  @IsNotEmpty()
  word: string;
}
