import { ConfigModule } from '@nestjs/config';
import { TmdbService } from './tmdb.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/3',
      timeout: 5000,
    }),
  ],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
