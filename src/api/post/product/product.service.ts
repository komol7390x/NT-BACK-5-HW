import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminQueryService } from 'src/core/query/admin-query-db';
import { ISuccess } from 'src/common/database/success-res/success-interface';
import { successRes } from 'src/common/database/success-res/success-res';
import { ProductQueryService } from 'src/core/query/product-query-db';

@Injectable()
export class ProductService {
  constructor(private readonly db: ProductQueryService) {}
  // --------------------- CREATE ---------------------
  async create(createProductDto: CreateProductDto): Promise<ISuccess> {
  
    // save database
    const result = await this.db.create('product', { createProductDto });

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
    const data = await this.db.findAll('product');

    // return success
    if (data?.message) {
      return successRes(data?.data as any);
    } else {
      throw new ConflictException(`error to: ${data?.error}`);
    }
  }
  // --------------------- GET ONE BY ID---------------------
  async findOne(id: number) {
    const data = await this.db.findById('product', id);

    // return success
    if (data?.message) {
      return successRes(data?.data);
    } else {
      if (data?.data) {
        throw new NotFoundException(`this id => ${id} not found on Product`);
      }
      throw new ConflictException(`error to: ${data?.error}`);
    }
  }
  // --------------------- GET ONE BY ANY ---------------------

  async findByOne(value: string) {
    // find by one
    const data = await this.db.findByOne('product', value);

    console.log(data);
    // return success
    if (data?.message) {
      
      return data.data;
    } else {
      return null;
    }
  }
  // --------------------- UPDATE ---------------------

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name } = updateProductDto;

    await this.findOne(id);

    if (name) {
      //check name
       const data = await this.findByOne(name);
       if (!data) {
         throw new ConflictException(`this ${name} already exist on Product`);
       }
    }

    // save database
    const result = await this.db.update(
      'product',
      {
        updateProductDto,
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
    const data = await this.db.delete('product', id);

    // return success
    if (data?.message) {
      return successRes({});
    } else {
      throw new ConflictException(`error to: ${data?.data}`);
    }
  }
}
