import { z } from 'zod';

export const tmdbMovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, 'Título é obrigatório'),

  poster_path: z.string().nullable().optional(), 
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number().min(0).max(10), 

  overview: z.string().nullable().optional(), 
  release_date: z.string().nullable().optional(), 
  runtime: z.number().int().nullable().optional(), 
  
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .nullable()
    .optional(),
});

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>;