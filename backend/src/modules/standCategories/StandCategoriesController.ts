import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetStandCategoriesFilterDto } from './dto/GetStandCategoriesFilterDto';
import { Logger } from '@nestjs/common';
import { StandCategoriesService } from './StandCategoriesService';
import { CreateStandCategoryDto } from './dto/CreateStandCategoryDto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateStandCategoryDto } from './dto/UpdateStandCategoryDto';

@Controller('standCategories')
@UseGuards(AuthGuard())
export class StandCategoriesController {
  private logger = new Logger(StandCategoriesController.name);

  constructor(private standCategoriesService: StandCategoriesService) {}

  @Get()
  getStandCategories(@Query() filterDto: GetStandCategoriesFilterDto) {
    return this.standCategoriesService.getStandCategories(filterDto);
  }

  @Get('/:id')
  getStandCategoryById(@Param('id') id: string) {
    return this.standCategoriesService.getStandCategoryById(id);
  }

  @Post()
  createStandCategory(@Body() createStandCategoryDto: CreateStandCategoryDto) {
    this.logger.verbose(`Creating a new standCategory. Data: ${JSON.stringify(createStandCategoryDto)}`);
    return this.standCategoriesService.createStandCategory(createStandCategoryDto);
  }

  @Patch('/:id')
  updateStandCategory(@Param('id') id: string, @Body() updateStandCategoryDto: UpdateStandCategoryDto) {
    this.logger.verbose(`Update an standCategory. Data: ${JSON.stringify(updateStandCategoryDto)}`);
    return this.standCategoriesService.updateStandCategory(id, updateStandCategoryDto);
  }

  @Delete('/:id')
  deleteStandCategory(@Param('id') id: string) {
    return this.standCategoriesService.deleteStandCategory(id);
  }
}
