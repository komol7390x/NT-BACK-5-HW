import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisEntity } from 'src/core/entities/regis.entity';
import { CryptoService } from 'src/common/crypto/Crypto';

@Module({
  imports:[TypeOrmModule.forFeature([RegisEntity])],
  controllers: [LoginController],
  providers: [LoginService,CryptoService],
})
export class LoginModule {}
