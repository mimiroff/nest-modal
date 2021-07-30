import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { NuxtModule } from './nuxt/nuxt.module';

@Module({
  imports: [DatabaseModule, AuthModule, NuxtModule],
})
export class AppModule {}
