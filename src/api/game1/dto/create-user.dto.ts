import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto1 {
  @ApiProperty({ type: 'string', description: 'Player name', example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
