import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerResponse } from 'src/common/swagger/swagger-response';
import { SwaggerDate } from 'src/infrastructure/document/swagger-data';
import { AuthGuard } from 'src/common/guard/auth-guard';
import { RolesGuard } from 'src/common/guard/role-guard';
import { AdminRoles, UserRoles } from 'src/common/enum/Role';
import { AccessRoles } from 'src/common/decorator/roles-decorator';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) { }

  // ------------------ CREATE ------------------
  //SWAGGER
  @ApiOperation({ summary: 'Create Borrow' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse(
      SwaggerDate.borrowDate,
      HttpStatus.CREATED,
      'Borrow created',
    ),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)

  //ENDPONT
  @Post()
  @ApiBearerAuth()

  // CREATE
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.createBorrow(createBorrowDto);
  }

  // ------------------ GET ALL ------------------
  //SWAGGER
  @ApiOperation({ summary: 'Get All Borrows' })
  @ApiResponse(
    SwaggerResponse.ApiSuccessResponse([
      SwaggerDate.borrowDate,
      SwaggerDate.borrowDate,
    ]),
  )
  //ENDPONT
  @Get()

  //FINDALL
  findAll() {
    return this.borrowService.findAll({
      relations: { books: true,user:true },
      where: { is_deleted: false },
      select: {
        borrow_date: true,
        due_date: true,
        overdue: true,
        books: { id: true, title: true },
        user:{id:true,email:true,full_name:true}
      },
      order: { createdAt: 'DESC' },
    });
  }

  // ------------------ GET ONE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Get One Borrow' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse(SwaggerDate.borrowDate))
  // ENDPONT
  @Get(':id')

  // GET ONE
  findOne(@Param('id') id: string) {
    return this.borrowService.findOneById(+id, {
      where: { is_deleted: false },
      take: 1,
    });
  }

  // ------------------ UPDATE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Update Borrow' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse(SwaggerDate.borrowDate))
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)
  // ENDPONT
  @Patch(':id')
  @ApiBearerAuth()
  // UPDATE
  update(@Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
    return this.borrowService.updateBorrow(+id, updateBorrowDto);
  }

  // ------------------ SOFT DELETE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Soft Delete Borrow' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse(SwaggerDate.borrowDate))
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, UserRoles.LIBRARIAN)
  // ENDPONT
  @Patch(':id/soft')
  @ApiBearerAuth()
  // SOFT DELETE
  softRemove(@Param('id') id: string) {
    return this.borrowService.softDelete(+id);
  }

  // ------------------ DELETE ------------------
  // SWAGGER
  @ApiOperation({ summary: 'Delete Borrow' })
  @ApiResponse(SwaggerResponse.ApiSuccessResponse(SwaggerDate.borrowDate))
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(AdminRoles.SUPERADMIN)
  // ENDPONT
  @Delete(':id')
  @ApiBearerAuth()
  //  DELETE
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
