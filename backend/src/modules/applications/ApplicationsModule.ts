import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/AuthModule';
import { ApplicationsController } from './ApplicationsController';
import { ApplicationsService } from './ApplicationsService';
import { Application } from './Application';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), AuthModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
