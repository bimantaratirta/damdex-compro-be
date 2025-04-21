import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import appConfig from './config/app.config';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    }
  });

  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(helmet());
  await app.listen(appConfig().APP_PORT ?? 3000);
  const logger = new Logger();
  logger.log(`This app running at port ${appConfig().APP_PORT}`);
}
bootstrap();
