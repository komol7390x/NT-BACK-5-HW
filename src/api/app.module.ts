import { Module } from '@nestjs/common';
import { RegisModule } from './regis/regis.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/envConfig';
import { WinstonService } from 'src/common/winston/Winston';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from 'src/common/exception/all-exception';
import { ErrorEntity } from 'src/core/entities/error.entity';
import { InfoEntity } from 'src/core/entities/info.entity';
import { RegisEntity } from 'src/core/entities/regis.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: config.DB.USER,
      host: config.DB.HOST,
      password: config.DB.PASS,
      port: config.DB.PORT,
      database: config.DB.NAME,

      autoLoadEntities: true,
      synchronize: true,
      entities: [ErrorEntity, InfoEntity],
    }),
    RegisModule,
    LoginModule,
  ],
  providers: [
    WinstonService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [WinstonService],
})
export class AppModule {}
