import { useQuery } from '@tanstack/react-query'
import { tmdbMovieSchema } from '@vini-movies/types'
import type { TmdbMovie } from '@vini-movies/types'
import { api } from '@/lib/api'

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: ['movies', 'detail', id],
    queryFn: async () => {
      const { data } = await api.get<TmdbMovie>(`/movies/${id}`)
      return tmdbMovieSchema.parse(data)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
