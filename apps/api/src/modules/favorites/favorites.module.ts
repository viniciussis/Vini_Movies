import { DatabaseModule } from 'src/plugins/database/database.module.js'; 
import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
