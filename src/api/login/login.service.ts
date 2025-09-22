import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisEntity } from 'src/core/entities/regis.entity';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/common/crypto/Crypto';
import { successRes } from 'src/common/success/successRes';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(RegisEntity)
    private readonly user: Repository<RegisEntity>,
    private readonly crypto: CryptoService
  ) { }
  // --------------- LOG IN ---------------

  async login(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto

    // check email
    const exist = await this.user.findOne({ where: { email } })
    if (!exist) {
      throw new NotFoundException('Email or Password is invalid')
    }

    // check pass
    const checkPassword = await this.crypto.decrypt(password, exist.hash_password)
    if (!checkPassword) {
      throw new NotFoundException('Email or Password is invalid')
    }

    // return success
    return successRes(exist)
  }
}
