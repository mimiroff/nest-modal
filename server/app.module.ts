import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { NuxtModule } from './nuxt/nuxt.module';

@Module({
  imports: [AuthModule, NuxtModule],
})
export class AppModule {}
