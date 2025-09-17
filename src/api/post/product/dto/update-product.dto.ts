import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    name: 'name',
    description: 'Product name',
    example: 'Spiner',
    type: 'string',
  })
  name?: string;

  @ApiProperty({
    name: 'price',
    description: 'Product price',
    example: 500,
    type: 'number',
  })
  price?: number;

  @ApiProperty({
    name: 'quantity',
    description: 'Product quantity',
    example: 100,
    type: 'number',
  })
  quantity?: number;

  @ApiProperty({
    name: 'is_active',
    description: 'Product is active',
    example: true,
    type: 'boolean',
  })
  @IsBoolean()
  is_active?: boolean;
}
