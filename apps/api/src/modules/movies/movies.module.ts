import { MoviesController } from './movies.controller';
import { TmdbService } from '../tmdb/tmdb.service';
import { TmdbModule } from '../tmdb/tmdb.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MoviesController],
  imports: [TmdbModule],
  providers: [TmdbService],
})
export class MoviesModule {}
