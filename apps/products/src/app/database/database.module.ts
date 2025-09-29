import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as productsSchema from '../products/schema';
import { DATABASE_CONNECTION } from './database-connection';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.getOrThrow('DATABASE_URL');
        console.log('DATABASE_URL:', databaseUrl); // <-- логирование значения
        const pool = new Pool({
          connectionString: databaseUrl,
        });

        return drizzle(pool, {
          schema: {
            ...productsSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
