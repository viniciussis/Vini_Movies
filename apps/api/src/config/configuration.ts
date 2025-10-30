import { envSchema } from './env.schema';

export const configuration = () => {
  const env = envSchema.parse(process.env);

  return {
    port: env.PORT,
    environment: env.NODE_ENV,
    tmdb: {
      apiKey: env.TMDB_API_KEY,
    },
    database: {
      url: env.DATABASE_URL,
    },
  };
};

export type AppConfig = ReturnType<typeof configuration>;
