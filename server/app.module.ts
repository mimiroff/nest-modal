import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { NuxtModule } from './nuxt/nuxt.module';
import { UsersModule } from './users/users.module';

@Module({
  // NuxtModule should always be at the end of the list
  imports: [DatabaseModule, AuthModule, UsersModule, NuxtModule],
})
export class AppModule {}
