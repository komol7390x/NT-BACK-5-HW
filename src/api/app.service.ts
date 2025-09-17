import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config/envConfig';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/infrastructure/exception/handle-error';

export class Application {
    static async main(): Promise<void> {
        const app = await NestFactory.create(AppModule);

        app.useGlobalFilters(new AllExceptionFilter())

        // ------------------ VALIDATSIYA ------------------
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }));

        // ------------------ SWAGGER ------------------
        const configSwagger = new DocumentBuilder()
            .setTitle('TEST')
            .setVersion('1.0.0')
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            })
            .build();

        const documentSwagger = SwaggerModule.createDocument(app, configSwagger);

        SwaggerModule.setup(config.API_VERSION, app, documentSwagger);

        // ------------------ PORT ------------------
        const PORT = config.PORT;
        const logging = new Logger('URL_SWAGGER');

        await app.listen(PORT);
        logging.log(`Application running on: http://${config.API_URL}:${PORT}/${config.API_VERSION}`);
    }
}
