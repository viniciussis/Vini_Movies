import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),

  DATABASE_URL: z.string().url(),

  TMDB_API_KEY: z.string().min(10, 'TMDB_API_KEY must have at least 10 characters'),
});

export type EnvSchema = z.infer<typeof envSchema>;
