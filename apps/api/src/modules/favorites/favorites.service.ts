import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateFavorite } from '@vini-movies/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFavorite) {
    try {
      // Tenta criar o novo favorito no banco
      return await this.prisma.favoriteMovie.create({
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Este filme já está nos favoritos.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.favoriteMovie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(tmdbId: number) {
    try {
      return await this.prisma.favoriteMovie.delete({
        where: { tmdbId: tmdbId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Filme favorito não encontrado.');
      }
      throw error;
    }
  }
}
