import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminQueryService } from 'src/core/query/query-db';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';

@Injectable()
export class AdminService {
  constructor(private readonly db: AdminQueryService,private readonly crypto:CryptoService) { }
  async create(createAdminDto: CreateAdminDto) {
    const {username,password,...rest}=createAdminDto
    const hashed_password=await this.crypto.encrypt(password)
    this.db.create('admin', { username,hashed_password,...rest })
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}