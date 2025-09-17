import { Injectable } from '@nestjs/common';
import { CreateSallerDto } from './dto/create-saller.dto';
import { UpdateSallerDto } from './dto/update-saller.dto';

@Injectable()
export class SallerService {
  create(createSallerDto: CreateSallerDto) {
    return 'This action adds a new saller';
  }

  findAll() {
    return `This action returns all saller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saller`;
  }

  update(id: number, updateSallerDto: UpdateSallerDto) {
    return `This action updates a #${id} saller`;
  }

  remove(id: number) {
    return `This action removes a #${id} saller`;
  }
}
