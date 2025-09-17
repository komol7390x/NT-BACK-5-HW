import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // ------------------------ CREATE ------------------------
  @ApiOperation({ summary: 'Created Product' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  // ------------------------ GET ALL ------------------------
  @ApiOperation({ summary: 'Get All Product' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  // ------------------------ GET ONE ------------------------
  @ApiOperation({ summary: 'Get One Product' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  // ------------------------ UPDATE ------------------------
  @ApiOperation({ summary: 'Update Product' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  // ------------------------ DELETE ------------------------
  @ApiOperation({ summary: 'Delete Product' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
 
}
