import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { createFavoriteSchema, CreateFavorite } from '@vini-movies/types';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { FavoritesService } from './favorites.service';
import z from 'zod';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createFavoriteSchema))
  create(@Body() dto: CreateFavorite) {
    return this.favoritesService.create(dto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':tmdbId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tmdbId', ParseIntPipe) tmdbId: number) {
    return this.favoritesService.remove(tmdbId);
  }
}
