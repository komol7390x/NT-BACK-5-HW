import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User name' })
  @IsNotEmpty({ message: 'Name bo\'sh bo\'lishi mumkin emas' })
  name: string;

  @Field(() => String, { description: 'User Email' })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  email: string;

  @Field(() => Int, { description: 'User age' })
  @IsInt({ message: 'Yosh butun son bo\'lishi kerak' })
  @Min(0, { message: 'Yosh manfiy bo\'lishi mumkin emas' })
  age: number;

  @Field(() => String, { description: 'User password' })
  @Length(6, 20, { message: 'Parol 6-20 belgidan iborat bo\'lishi kerak' })
  password: string;
}
