import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Stand } from './stand.entity';
import { StandsController } from './stands.controller';
import { StandsService } from './stands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stand]), AuthModule],
  controllers: [StandsController],
  providers: [StandsService],
  exports: [StandsService],
})
export class StandsModule {}
