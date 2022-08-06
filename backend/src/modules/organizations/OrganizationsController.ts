import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetOrganizationsFilterDto } from './dto/GetOrganizationsFilterDto';
import { Logger } from '@nestjs/common';
import { OrganizationsService } from './OrganizationsService';
import { CreateOrganizationDto } from './dto/CreateOrganizationDto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateOrganizationDto } from './dto/UpdateOrganizationDto';

@Controller('organizations')
@UseGuards(AuthGuard())
export class OrganizationsController {
  private logger = new Logger(OrganizationsController.name);

  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  getOrganizations(@Query() filterDto: GetOrganizationsFilterDto) {
    return this.organizationsService.getOrganizations(filterDto);
  }

  @Get('/:id')
  getOrganizationById(@Param('id') id: string) {
    return this.organizationsService.getOrganizationById(id);
  }

  @Post()
  createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    this.logger.verbose(`Creating a new organization. Data: ${JSON.stringify(createOrganizationDto)}`);
    return this.organizationsService.createOrganization(createOrganizationDto);
  }

  @Patch('/:id')
  updateOrganization(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    this.logger.verbose(`Update an organization. Data: ${JSON.stringify(updateOrganizationDto)}`);
    return this.organizationsService.updateOrganization(id, updateOrganizationDto);
  }

  @Delete('/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationsService.deleteOrganization(id);
  }
}
