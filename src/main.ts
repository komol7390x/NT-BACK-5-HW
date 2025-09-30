import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = 3003
  await app.listen(PORT, () => {
    console.log('Server is running PORT', PORT);
  });
}
bootstrap();
