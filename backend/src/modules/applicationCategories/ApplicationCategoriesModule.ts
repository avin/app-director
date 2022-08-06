import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/AuthModule';
import { ApplicationCategoriesController } from './ApplicationCategoriesController';
import { ApplicationCategoriesService } from './ApplicationCategoriesService';
import { ApplicationCategory } from './ApplicationCategory';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationCategory]), AuthModule],
  controllers: [ApplicationCategoriesController],
  providers: [ApplicationCategoriesService],
  exports: [ApplicationCategoriesService],
})
export class ApplicationCategoriesModule {}
