import { Module } from '@nestjs/common';
import { RegisService } from './regis.service';
import { RegisController } from './regis.controller';
import { CryptoService } from 'src/common/crypto/Crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisEntity } from 'src/core/entities/regis.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RegisEntity])],
  controllers: [RegisController],
  providers: [RegisService,CryptoService],
})
export class RegisModule {}
