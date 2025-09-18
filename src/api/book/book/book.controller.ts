import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerResponse } from 'src/common/swagger/swagger-response';
import { SwaggerDate } from 'src/infrastructure/document/swagger-data';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { RolesGuard } from 'src/common/guard/role-guard';
import { AdminRoles, UserRoles } from 'src/common/enum/Role';
import { AccessRoles } from 'src/common/decorator/roles-decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }
  // ------------------ CREATE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Created Book' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse(
      SwaggerDate.bookDate,
      HttpStatus.CREATED,
      'Book created',
    ),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)

  // ENDPOINT
  @Post()
  @ApiBearerAuth()

  // CREATED
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }
  // ------------------ GET ALL ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Get All Book' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse([SwaggerDate, SwaggerDate.bookDate]))

  @Get()

  // FIND ALL
  findAll() {
    return this.bookService.findAll({
      where: { is_deleted: false},
      select: {
        id: true,
        title: true,
        avialable:true
      },
      order: { createdAt: 'DESC' },
    });
  }
  // ------------------ GET ONE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Get One Book' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse([SwaggerDate.bookDate]))


  @Get(':id')

  // FIND ONE
  findOne(@Param('id') id: string) {
    return this.bookService.findOneById(+id,{
      where: { is_deleted: false},
      select: {
        id: true,
        title: true,
        avialable:true,
        createdAt:true,
        author:true,
        published_year:true
      }});
  }
  // ------------------ SOFT DELETE ------------------
  @ApiOperation({ summary: 'Soft Delete Book' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse({}),
  )

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)

  //ENDPOINT
  @Patch('soft/:id')
  @ApiBearerAuth()

  // SOFT DELETE
  sofRemove(@Param('id') id: string) {
    return this.bookService.softDelete(+id);
  }
  // ------------------ UPDATE ------------------
  @ApiOperation({ summary: 'Update Book' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse(SwaggerDate.bookDate),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)

  //ENDPOINT
  @Patch(':id')
  @ApiBearerAuth()

  //UPDATE
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(+id, updateBookDto);
  }
  // ------------------ DELETE ------------------
  @ApiOperation({ summary: 'Delete Book' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse({}),
  )

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN)


  @Delete(':id')
  @ApiBearerAuth()

  // REMOVE
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }


}
