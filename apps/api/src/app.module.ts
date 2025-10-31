import { DatabaseModule } from './plugins/database/database.module';
import { TmdbService } from './modules/tmdb/tmdb.service';
import { TmdbModule } from './modules/tmdb/tmdb.module';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    TmdbModule,
    MoviesModule,
    FavoritesModule,
  ],
  providers: [TmdbService],
})
export class AppModule {}
