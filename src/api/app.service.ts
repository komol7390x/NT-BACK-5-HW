import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, Logger, ValidationPipe } from "@nestjs/common";
import { config } from "../config/envConfig";

export class Application {
  static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    // ------------------ VALIDATSIYA ------------------

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }))
    // ------------------ PORT ------------------

    const PORT = config.PORT
    const logging = new Logger('GraphQL-library');
    await app.listen(PORT, () => {
      {
        setTimeout(() => {
          logging.log(`GraphQL UI: http://${config.API_URL}:${PORT}/${config.API_VERSION}`);
        });
      }
    });
  }
}