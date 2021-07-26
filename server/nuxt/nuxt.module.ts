import { Module } from '@nestjs/common';

import { NuxtController } from './nuxt.controller';

@Module({
  controllers: [NuxtController],
})
export class NuxtModule {}
