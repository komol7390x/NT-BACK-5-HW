import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // ------------------------ CREATE ------------------------
  @ApiOperation({ summary: 'Created Admin' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  // ------------------------ GET ALL ------------------------
  @ApiOperation({ summary: 'Get All Admin' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  // ------------------------ GET ONE ------------------------
  @ApiOperation({ summary: 'Get One Admin' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  // ------------------------ UPDATE ------------------------
  @ApiOperation({ summary: 'Update Admin' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  // ------------------------ DELETE ------------------------
  @ApiOperation({ summary: 'Delete Admin' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
