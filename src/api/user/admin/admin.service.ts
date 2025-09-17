import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminQueryService } from 'src/core/query/admin-query-db';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';
import { ISuccess } from 'src/common/database/success-res/success-interface';
import { successRes } from 'src/common/database/success-res/success-res';
import { log } from 'util';

@Injectable()
export class AdminService {
  constructor(
    private readonly db: AdminQueryService,
    private readonly crypto: CryptoService,
  ) {}
  // --------------------- CREATE ---------------------
  async create(createAdminDto: CreateAdminDto): Promise<ISuccess> {
    const { password, ...rest } = createAdminDto;

    // hashed password
    const hashed_password = await this.crypto.encrypt(password);

    // save database
    const result = await this.db.create('admin', {
      hashed_password,
      ...rest,
    });

    // return success
    if (result?.message) {
      return successRes(result);
    } else {
      throw new ConflictException(`error to: ${result?.error}`);
    }
  }
  // --------------------- GET ALL ---------------------

  async findAll(): Promise<ISuccess> {
    // find all
    const data = await this.db.findAll('admin');

    // return success
    if (data?.message) {
      return successRes(data?.data as any);
    } else {
      throw new ConflictException(`error to: ${data?.error}`);
    }
  }
  // --------------------- GET ONE BY ID---------------------
  async findOne(id: number) {
    const data = await this.db.findById('admin', id);

    // return success
    if (data?.message) {
      return successRes(data?.data);
    } else {
      if (data?.data) {
        throw new NotFoundException(`this id => ${id} not found`);
      }
      throw new ConflictException(`error to: ${data?.error}`);
    }
  }
  // --------------------- GET ONE BY ANY ---------------------

  async findByOne(value: string) {
    // find by one
    const data = await this.db.findByOne('admin', value);

    // return success
    if (data?.message) {
      return data.data;
    } else {
      return null;
    }
  }
  // --------------------- UPDATE ---------------------

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { password, ...rest } = updateAdminDto;

    await this.findOne(id);

    let hashed_password = '';
    if (password) {
      // hashed password
      hashed_password = await this.crypto.encrypt(password);
    }

    // save database
    const result = await this.db.update(
      'admin',
      {
        hashed_password,
        ...rest,
      },
      id,
    );
    // return success
    if (result?.message) {
      return successRes(result);
    } else {
      throw new ConflictException(`error to: ${result?.error}`);
    }
  }
  // --------------------- DELETE ---------------------

  async remove(id: number) {
    await this.findOne(id);
    // find by one
    const data = await this.db.delete('admin', id);

    // return success
    if (data?.message) {
      return successRes({});
    } else {
      throw new ConflictException(`error to: ${data?.data}`);
    }
  }
}
