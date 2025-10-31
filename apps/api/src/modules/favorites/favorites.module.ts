import { DatabaseModule } from 'src/plugins/database/database.module.js';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
