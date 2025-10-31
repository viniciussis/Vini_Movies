import { z } from 'zod';

export const createFavoriteSchema = z.object({
  tmdbId: z.number().int().positive('tmdbId deve ser um número positivo'),
  title: z.string().min(1, 'Título é obrigatório'),
  posterPath: z.string().optional().nullable(),
  rating: z.number().min(0).max(10),
});

export type CreateFavorite = z.infer<typeof createFavoriteSchema>;

export const favoriteMovieSchema = createFavoriteSchema.extend({
  id: z.number().int(),
  createdAt: z.date(),
});

export type FavoriteMovie = z.infer<typeof favoriteMovieSchema>;