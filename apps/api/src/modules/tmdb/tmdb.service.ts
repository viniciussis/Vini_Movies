import { AppConfig } from 'src/config/configuration';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    this.apiKey = this.configService.getOrThrow('tmdb.apiKey', { infer: true });

    if (!this.apiKey) {
      this.logger.error('TMDB_API_KEY não está definida!');
    }
  }

  async searchMovies(query: string) {
    const params = {
      api_key: this.apiKey,
      language: 'pt-BR',
      query: query,
      page: 1,
    };

    const { data } = await firstValueFrom(
      this.httpService.get('/search/movie', { params }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Falha ao buscar filmes: ${error.response?.data}`);
          throw 'Ocorreu um erro ao buscar os filmes.';
        }),
      ),
    );

    return data.results;
  }

  async getMovieDetail(id: number) {
    const params = {
      api_key: this.apiKey,
      language: 'pt-BR',
    };

    const { data } = await firstValueFrom(
      this.httpService.get(`/movie/${id}`, { params }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(
            `Falha ao buscar detalhes do filme ${id}: ${error.response?.data}`,
          );
          throw 'Ocorreu um erro ao buscar os detalhes do filme.';
        }),
      ),
    );

    return data;
  }
}
