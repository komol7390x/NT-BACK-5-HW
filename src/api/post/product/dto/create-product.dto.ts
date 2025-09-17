import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    name: 'name',
    description: 'Product name',
    example: 'Spiner',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'Product price',
    example: 500,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    name: 'quantity',
    description: 'Product quantity',
    example: 100,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
