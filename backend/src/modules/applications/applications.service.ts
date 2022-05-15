import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetApplicationsFilterDto } from './dto/get-applications-filter.dto';
import { ApplicationsRepository } from './applications.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationsRepository)
    private applicationsRepository: ApplicationsRepository,
  ) {}

  getApplications(filterDto: GetApplicationsFilterDto): Promise<Application[]> {
    return this.applicationsRepository.getApplications(filterDto);
  }

  async getApplicationById(id: string): Promise<Application> {
    const found = await this.applicationsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return found;
  }

  createApplication(createApplicationDto: CreateApplicationDto): Promise<Application> {
    return this.applicationsRepository.createApplication(createApplicationDto);
  }

  async deleteApplication(id: string): Promise<void> {
    const result = await this.applicationsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}
