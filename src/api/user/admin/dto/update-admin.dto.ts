import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiPropertyOptional({
    name: 'name',
    description: 'Admin name',
    example: 'John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    name: 'username',
    description: 'Admin username',
    example: 'john_doe_1',
  })
  username?: string;

  @ApiPropertyOptional({
    name: 'password',
    description: 'Admin password',
    example: '!@JohnDoe123@!',
  })
  password?: string;
}
