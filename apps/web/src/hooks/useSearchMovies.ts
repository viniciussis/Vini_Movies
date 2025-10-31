import { useQuery } from '@tanstack/react-query'
import { tmdbMovieSchema } from '@vini-movies/types'
import { z } from 'zod'
import type { TmdbMovie } from '@vini-movies/types'
import { api } from '@/lib/api'

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async () => {
      const { data } = await api.get<Array<TmdbMovie>>(`/movies/search`, {
        params: { q: query },
      })
      return z.array(tmdbMovieSchema).parse(data)
    },
    enabled: query.length >= 3,
    staleTime: 1000 * 60 * 5,
  })
}
