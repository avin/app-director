import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { StandsController } from './stands.controller';
import { StandsRepository } from './stands.repository';
import { StandsService } from './stands.service';

@Module({
  imports: [TypeOrmModule.forFeature([StandsRepository]), AuthModule],
  controllers: [StandsController],
  providers: [StandsService],
})
export class StandsModule {}
