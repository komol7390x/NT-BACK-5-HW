import { PartialType } from '@nestjs/mapped-types';
import { CreateSallerDto } from './create-saller.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSallerDto extends PartialType(CreateSallerDto) {
  @ApiPropertyOptional({
    name: 'name',
    description: 'Saller name',
    example: 'Make Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    name: 'email',
    description: 'Saller email',
    example: 'john_doe_1',
  })
  email?: string;

  @ApiPropertyOptional({
    name: 'password',
    description: 'Saller password',
    example: '!@JohnDoe123@!',
  })
  password?: string;
}
