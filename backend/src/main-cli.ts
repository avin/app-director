// import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = new AppModule();

  console.log(app);
}
void bootstrap();
