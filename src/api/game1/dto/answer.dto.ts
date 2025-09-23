import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerQuestionDto1 {
  // --------------------- ANSWER ---------------------

  @ApiProperty({
    type: 'string',
    description: "O'yinchini javobi",
    example: 'book',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
