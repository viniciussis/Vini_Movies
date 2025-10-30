import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL'),
});

export type EnvSchema = z.infer<typeof envSchema>;
