import { NestFactory } from '@nestjs/core';
import express from 'express';
import path from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for serving resources from server
  app.use(express.static(path.join(__dirname, 'public')));
  // TODO switch to .env
  await app.listen(3000);
}

bootstrap();
