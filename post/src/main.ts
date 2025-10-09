import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 3002
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }))
  await app.listen();
  console.log('Book server is runing', 3002);
}
bootstrap();
