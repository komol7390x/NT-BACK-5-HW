// src/common/success/successRes.ts
import { InfoEntity } from '../../core/entities/info.entity';
import { AppDataSource } from '../database/data-source';
import { WinstonService } from '../winston/Winston';

export interface ISuccess {
  data: object;
  message: boolean;
  statusCode: number;
}

const winston = new WinstonService();

export const successRes = async (
  data: object,
  statusCode: number = 200,
): Promise<ISuccess> => {
  // Winston log
  winston.log('Success Response', { data, statusCode });

  return {
    message: true,
    statusCode,
    data,
  };
};
