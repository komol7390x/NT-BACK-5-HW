import { ISuccess } from './success-interface';

export const successRes = (
  data: {},
  statusCode: number = 200,
): ISuccess => {
  return {
    data,
    message: 'success',
    statusCode,
  };
};
