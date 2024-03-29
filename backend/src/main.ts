import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from './TransformInterceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
void bootstrap();
