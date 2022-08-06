import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/AuthModule';
import { StandCategoriesController } from './StandCategoriesController';
import { StandCategoriesService } from './StandCategoriesService';
import { StandCategory } from './StandCategory';

@Module({
  imports: [TypeOrmModule.forFeature([StandCategory]), AuthModule],
  controllers: [StandCategoriesController],
  providers: [StandCategoriesService],
  exports: [StandCategoriesService],
})
export class StandCategoriesModule {}
