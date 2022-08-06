import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/AuthModule';
import { Stand } from './Stand';
import { StandsController } from './StandsController';
import { StandsService } from './StandsService';

@Module({
  imports: [TypeOrmModule.forFeature([Stand]), AuthModule],
  controllers: [StandsController],
  providers: [StandsService],
  exports: [StandsService],
})
export class StandsModule {}
