import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class StartGameDto3 {
  @ApiProperty({ type: 'number', description: 'Max try ', example: 7 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  maxAttempts: number;

  @ApiProperty({ type: 'number', description: 'Min Number', example: 1 })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsNotEmpty()
  minRange: number;

  @ApiProperty({ type: 'number', description: 'Max number', example: 100 })
  @IsInt()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  @IsNotEmpty()
  maxRange: number;
}
