import { createFileRoute } from '@tanstack/react-router'
import { Heart, Star, Trash2 } from 'lucide-react'

import { useGetFavorites, useRemoveFavorite } from '@/hooks/useFavorites'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
})

function FavoritesPage() {
  const { data: favorites, isLoading, error } = useGetFavorites()
  const removeFavorite = useRemoveFavorite()

  const handleRemove = (tmdbId: number) => {
    if (confirm("Tem certeza que deseja remover este filme dos favoritos?")) {
      removeFavorite.mutate(tmdbId)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        <h1 className="text-4xl font-bold">Meus Favoritos</h1>
      </div>

      {isLoading && <div className="text-center text-muted-foreground">Carregando favoritos...</div>}

      {error && <div className="text-center text-destructive">Erro ao carregar favoritos. Tente novamente.</div>}

      {favorites && favorites.length === 0 && (
        <div className="text-center text-muted-foreground">Você ainda não tem filmes favoritos.</div>
      )}

      {favorites && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <Card key={movie.id} className="h-full">
              <CardContent className="p-0">
                {movie.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-muted flex items-center justify-center rounded-t-lg">
                    <span className="text-muted-foreground">Sem imagem</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 p-4">
                <div className="w-full space-y-2">
                  <h3 className="font-semibold line-clamp-2 text-sm">{movie.title}</h3>
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {movie.rating.toFixed(1)}
                  </Badge>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleRemove(movie.tmdbId)}
                  disabled={removeFavorite.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
