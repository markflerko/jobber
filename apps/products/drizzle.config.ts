import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/**/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DATABASE_URL! ||
      'postgres://postgres:example@localhost:5433/products?connection_limit=25&pool_timeout=1000&schema=public',
  },
});
