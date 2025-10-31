import { envSchema } from './env.schema';

export const configuration = () => {
  const env = envSchema.parse(import.meta.env);

  return {
    api: {
      baseUrl: env.VITE_API_BASE_URL,
    },
  };
};

export type AppConfig = ReturnType<typeof configuration>;
