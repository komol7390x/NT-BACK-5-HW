import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SallerService } from './saller.service';
import { CreateSallerDto } from './dto/create-saller.dto';
import { UpdateSallerDto } from './dto/update-saller.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('saller')
export class SallerController {
  constructor(private readonly sallerService: SallerService) {}
    // ------------------------ CREATE ------------------------
    @ApiOperation({ summary: 'Created Saller' })
    @Post()
    create(@Body() createSallerDto: CreateSallerDto) {
      return this.sallerService.create(createSallerDto);
    }
    // ------------------------ GET ALL ------------------------
    @ApiOperation({ summary: 'Get All Saller' })
    @Get()
    findAll() {
      return this.sallerService.findAll();
    }
    // ------------------------ GET ONE ------------------------
    @ApiOperation({ summary: 'Get One Saller' })
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sallerService.findOne(+id);
    }
    // ------------------------ UPDATE ------------------------
    @ApiOperation({ summary: 'Update Saller' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSallerDto: UpdateSallerDto) {
      return this.sallerService.update(+id, updateSallerDto);
    }
    // ------------------------ DELETE ------------------------
    @ApiOperation({ summary: 'Delete Saller' })
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sallerService.remove(+id);
    }
}
