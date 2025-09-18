import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty} from 'class-validator';

export class SignInUSerDto {
  // --------------------------------------- EMAIL ---------------------------------------
  @ApiProperty({ description: 'User email', example: 'www.komol7390@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

  // --------------------------------------- PASSSWORD ---------------------------------------
  @ApiProperty({
    description: 'User password',
    example: '@Komol7390x',
  })
  @IsNotEmpty()
  password: string;
}