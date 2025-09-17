import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSallerDto } from './dto/create-saller.dto';
import { UpdateSallerDto } from './dto/update-saller.dto';
import { CryptoService } from 'src/infrastructure/crypto/Crypto';
import { successRes } from 'src/common/database/success-res/success-res';
import { ISuccess } from 'src/common/database/success-res/success-interface';
import { SallerQueryService } from 'src/core/query/saller-query-db';

@Injectable()
export class SallerService {
  constructor(
    private readonly db: SallerQueryService,
    private readonly crypto: CryptoService,
  ) {}
  // --------------------- CREATE ---------------------
  async create(createSallerDto: CreateSallerDto): Promise<ISuccess> {
    const { password, ...rest } = createSallerDto;

    // hashed password
    const hashed_password = await this.crypto.encrypt(password);

    // save database
    const result = await this.db.create('saller', {
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
    const data = await this.db.findAll('saller');

    // return success
    if (data?.message) {
      return successRes(data?.data as any);
    } else {
      throw new ConflictException(`error to: ${data?.error}`);
    }
  }
  // --------------------- GET ONE BY ID---------------------
  async findOne(id: number) {
    const data = await this.db.findById('saller', id);

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
    const data = await this.db.findByOne('saller', value);

    // return success
    if (data?.message) {
      return data.data;
    } else {
      return null;
    }
  }
  // --------------------- UPDATE ---------------------

  async update(id: number, updateSallerDto: UpdateSallerDto) {
    const { password, ...rest } = updateSallerDto;

    await this.findOne(id);

    let hashed_password = '';
    if (password) {
      // hashed password
      hashed_password = await this.crypto.encrypt(password);
    }

    // save database
    const result = await this.db.update(
      'saller',
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
    const data = await this.db.delete('saller', id);

    // return success
    if (data?.message) {
      return successRes({});
    } else {
      throw new ConflictException(`error to: ${data?.data}`);
    }
  }
}
