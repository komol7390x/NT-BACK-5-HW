import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number
}
