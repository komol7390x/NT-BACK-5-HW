import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ========================= SWAGGER =========================
  const api = 'api';
  const configSwagger = new DocumentBuilder()
  .setTitle('Theatr')
  .setVersion('1.0.0')
  .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();
    
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(api, app, documentSwagger);

  const logging = new Logger('Swagger-cinemauz');

  // ========================= PORT =========================
  const PORT = 3005

  await app.listen(PORT, () => {
    setTimeout(() => {
      logging.log(`Swagger UI: http://localhost:${PORT}/${api}`);
    });
  })
}
bootstrap();
