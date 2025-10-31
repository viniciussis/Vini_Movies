import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFavoriteSchema, favoriteMovieSchema } from '@vini-movies/types'
import { z } from 'zod'
import type { CreateFavorite, FavoriteMovie } from '@vini-movies/types'
import { api } from '@/lib/api'

export function useGetFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await api.get<Array<FavoriteMovie>>('/favorites')
      return z.array(favoriteMovieSchema).parse(data)
    },
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (favorite: CreateFavorite) => {
      const validatedData = createFavoriteSchema.parse(favorite)
      const { data } = await api.post<FavoriteMovie>(
        '/favorites',
        validatedData,
      )
      return favoriteMovieSchema.parse(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tmdbId: number) => {
      await api.delete(`/favorites/${tmdbId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}
