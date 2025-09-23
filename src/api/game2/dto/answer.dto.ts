import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerQuestionDto {
  // --------------------- ANSWER ---------------------

  @ApiProperty({
    type: 'string',
    description: "O'yinchini javobi",
    example: 'Shaxmat',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
