import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetApplicationsFilterDto } from './dto/GetApplicationsFilterDto';
import { Logger } from '@nestjs/common';
import { ApplicationsService } from './ApplicationsService';
import { CreateApplicationDto } from './dto/CreateApplicationDto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateApplicationDto } from './dto/UpdateApplicationDto';

@Controller('applications')
@UseGuards(AuthGuard())
export class ApplicationsController {
  private logger = new Logger(ApplicationsController.name);

  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  getApplications(@Query() filterDto: GetApplicationsFilterDto) {
    return this.applicationsService.getApplications(filterDto);
  }

  @Get('/:id')
  getApplicationById(@Param('id') id: string) {
    return this.applicationsService.getApplicationById(id);
  }

  @Post()
  createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    this.logger.verbose(`Creating a new application. Data: ${JSON.stringify(createApplicationDto)}`);
    return this.applicationsService.createApplication(createApplicationDto);
  }

  @Patch('/:id')
  updateApplication(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    this.logger.verbose(`Update an application. Data: ${JSON.stringify(updateApplicationDto)}`);
    return this.applicationsService.updateApplication(id, updateApplicationDto);
  }

  @Delete('/:id')
  deleteApplication(@Param('id') id: string) {
    return this.applicationsService.deleteApplication(id);
  }
}
