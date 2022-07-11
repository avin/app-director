import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

const httpsOptions =
  process.env.STAGE === 'dev'
    ? {
        key: fs.readFileSync('./node_modules/localhost-certs/files/server.key', 'utf8'),
        cert: fs.readFileSync('./node_modules/localhost-certs/files/server.crt', 'utf8'),
      }
    : undefined;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
void bootstrap();
