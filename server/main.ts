import { NestFactory } from '@nestjs/core';
import express from 'express';
import path from 'path';

import { AppModule } from './app.module';
import { getConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, 'public')));
  await app.listen(getConfig().APP_PORT);
}

bootstrap();
