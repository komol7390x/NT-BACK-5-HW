import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RegisService } from './regis.service';
import { CreateRegiDto } from './dto/create-regi.dto';

@Controller('user')
export class RegisController {
  constructor(private readonly regisService: RegisService) {}

  @Post()
  create(@Body() createRegiDto: CreateRegiDto) {
    return this.regisService.create(createRegiDto);
  }

  @Get()
  findAll() {
    return this.regisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regisService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regisService.remove(+id);
  }
}
