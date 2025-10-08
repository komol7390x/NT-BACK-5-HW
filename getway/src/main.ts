import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3005
  await app.listen(PORT, () => console.log('Main server is running', PORT));
}
bootstrap();
