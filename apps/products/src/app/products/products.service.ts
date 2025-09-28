import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createProduct(
    product: Omit<typeof schema.products.$inferSelect, 'id'>
  ) {
    await this.db.insert(schema.products).values({ ...product });
  }
}
