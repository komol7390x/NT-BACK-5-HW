import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { HttpException } from '@nestjs/common';

@Injectable()
export class GrpcToHttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // Agar bu gRPC error bo‘lsa, HTTP formatga o‘tkazamiz
        if (err?.code !== undefined) {
          let httpStatus = 500;

          switch (err.code) {
            case status.NOT_FOUND:
              httpStatus = 404;
              break;
            case status.ALREADY_EXISTS:
              httpStatus = 409;
              break;
            case status.INVALID_ARGUMENT:
              httpStatus = 400;
              break;
            case status.PERMISSION_DENIED:
              httpStatus = 403;
              break;
            case status.UNAUTHENTICATED:
              httpStatus = 401;
              break;
          }

          return throwError(
            () => new HttpException(err.message || 'gRPC Error', httpStatus),
          );
        }

        // Aks holda, boshqa xatoni qaytaramiz
        return throwError(() => err);
      }),
    );
  }
}
