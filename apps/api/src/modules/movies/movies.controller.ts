import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('search')
  searchMovies(@Query('q') query: string) {
    if (!query) {
      return [];
    }
    return this.tmdbService.searchMovies(query);
  }

  @Get(':id')
  getMovieDetail(@Param('id') id: string) {
    return this.tmdbService.getMovieDetail(Number(id));
  }
}
