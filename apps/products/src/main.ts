/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { init } from '@jobber/nestjs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app);
}

bootstrap();
