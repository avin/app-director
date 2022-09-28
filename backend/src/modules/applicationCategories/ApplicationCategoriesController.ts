import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetApplicationCategoriesFilterDto } from './dto/GetApplicationCategoriesFilterDto';
import { Logger } from '@nestjs/common';
import { ApplicationCategoriesService } from './ApplicationCategoriesService';
import { CreateApplicationCategoryDto } from './dto/CreateApplicationCategoryDto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateApplicationCategoryDto } from './dto/UpdateApplicationCategoryDto';

@Controller('applicationCategories')
@UseGuards(AuthGuard())
export class ApplicationCategoriesController {
  private logger = new Logger(ApplicationCategoriesController.name);

  constructor(
    private applicationCategoriesService: ApplicationCategoriesService,
  ) {}

  @Get()
  getApplicationCategories(
    @Query() filterDto: GetApplicationCategoriesFilterDto,
  ) {
    return this.applicationCategoriesService.getApplicationCategories(
      filterDto,
    );
  }

  @Get('/:id')
  getApplicationCategoryById(@Param('id') id: string) {
    return this.applicationCategoriesService.getApplicationCategoryById(id);
  }

  @Post()
  createApplicationCategory(
    @Body() createApplicationCategoryDto: CreateApplicationCategoryDto,
  ) {
    this.logger.verbose(
      `Creating a new applicationCategory. Data: ${JSON.stringify(
        createApplicationCategoryDto,
      )}`,
    );
    return this.applicationCategoriesService.createApplicationCategory(
      createApplicationCategoryDto,
    );
  }

  @Patch('/:id')
  updateApplicationCategory(
    @Param('id') id: string,
    @Body() updateApplicationCategoryDto: UpdateApplicationCategoryDto,
  ) {
    this.logger.verbose(
      `Update an applicationCategory. Data: ${JSON.stringify(
        updateApplicationCategoryDto,
      )}`,
    );
    return this.applicationCategoriesService.updateApplicationCategory(
      id,
      updateApplicationCategoryDto,
    );
  }

  @Delete('/:id')
  deleteApplicationCategory(@Param('id') id: string) {
    return this.applicationCategoriesService.deleteApplicationCategory(id);
  }
}
