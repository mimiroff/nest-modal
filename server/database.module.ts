import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConfig } from './config';

const config = getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [`${__dirname}/**/*.entity.ts`],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
