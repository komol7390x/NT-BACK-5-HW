import { PartialType } from '@nestjs/mapped-types';
import { CreateRegiDto } from './create-regi.dto';

export class UpdateRegiDto extends PartialType(CreateRegiDto) {}
