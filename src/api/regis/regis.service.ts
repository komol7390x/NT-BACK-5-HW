import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegiDto } from './dto/create-regi.dto';
import { CryptoService } from 'src/common/crypto/Crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisEntity } from 'src/core/entities/regis.entity';
import { Repository } from 'typeorm';
import { ISuccess, successRes } from 'src/common/success/successRes';

@Injectable()
export class RegisService {
  constructor(
    @InjectRepository(RegisEntity)
    private readonly user: Repository<RegisEntity>,
    private readonly crypt: CryptoService,
  ) {}

  // ----------------------- CREATE -----------------------
  async create(createRegiDto: CreateRegiDto) {
    // distructure
    const { email, password, ...rest } = createRegiDto;

    // check email
    const exist = await this.user.findOne({ where: { email } });
    if (exist) {
      throw new ConflictException(
        `this email => ${email} already exist on user`,
      );
    }
    
    // hashed password
    const hash_password = await this.crypt.encrypt(password);
    
    const data = this.user.create({ email, hash_password, ...rest });
    
    // save db
    await this.user.save(data);

    // success
    return successRes(data, 201);
  }
  // ----------------------- FIND ALL -----------------------

  async findAll() {
    // find all
    const data = await this.user.find();

    // success
    return successRes(data);
  }
  // ----------------------- FIND ONE ID -----------------------

  async findOneById(id: number): Promise<ISuccess> {
    // check id
    const data = await this.user.findOne({ where: { id } });

    // not found id
    if (!data) {
      throw new NotFoundException(`not found this id => ${id} on user`);
    }

    // success
    return successRes(data);
  }
  // ----------------------- FIND ONE -----------------------

  async findOneBy(email: string): Promise<ISuccess> {
    // find email
    const data = await this.user.findOne({ where: { email } });

    // if not find
    if (!data) {
      throw new NotFoundException(`not found this email => ${email} on user`);
    }

    // success
    return successRes(data);
  }
  // ----------------------- REMOVE -----------------------

  async remove(id: number) {
    // check id
    await this.findOneById(id);

    // remove
    await this.user.find();

    // success
    return successRes({});
  }
}
