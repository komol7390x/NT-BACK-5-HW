import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateSallerDto {
  @ApiProperty({
    name: 'name',
    description: 'Saller name',
    example: 'Make Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'Saller email',
    example: 'www.make@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Saller password',
    example: '!@JohnDoe123@!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
