import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  // --------------------- QUESTION ---------------------
  @ApiProperty({
    type: 'string',
    description: "O'yinchi uchun savol",
    example: "Oq-qora donalar, taxta ustida o'ynar — bu nima?",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  // --------------------- ANSWER ---------------------

  @ApiProperty({
    type: 'string',
    description: "O'yinchi uchun javob",
    example: 'Shaxmat',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
