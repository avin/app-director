import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GetStandsFilterDto } from './dto/get-stands-filter.dto';
import { Logger } from '@nestjs/common';
import { StandsService } from './stands.service';
import { CreateStandDto } from './dto/create-stand.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('stands')
@UseGuards(AuthGuard())
export class StandsController {
  private logger = new Logger('StandsController');

  constructor(private standsService: StandsService) {}

  @Get()
  getStands(@Query() filterDto: GetStandsFilterDto) {
    return this.standsService.getStands(filterDto);
  }

  @Get('/:id')
  getStandById(@Param('id') id: string) {
    return this.standsService.getStandById(id);
  }

  @Post()
  createStand(@Body() createStandDto: CreateStandDto) {
    this.logger.verbose(`Creating a new stand. Data: ${JSON.stringify(createStandDto)}`);
    return this.standsService.createStand(createStandDto);
  }

  @Delete('/:id')
  deleteStand(@Param('id') id: string) {
    return this.standsService.deleteStand(id);
  }
}
