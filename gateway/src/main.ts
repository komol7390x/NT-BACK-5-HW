import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcToHttpInterceptor } from './grpc-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new GrpcToHttpInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  console.log('server running on port 3000');
}
bootstrap();
