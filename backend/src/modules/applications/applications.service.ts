import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetApplicationsFilterDto } from './dto/get-applications-filter.dto';
import { ApplicationsRepository } from './applications.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationDto } from './dto/update-application.dto';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationsRepository)
    private applicationsRepository: ApplicationsRepository,
  ) {}

  getApplications(filterDto: GetApplicationsFilterDto) {
    return this.applicationsRepository.getApplications(filterDto);
  }

  async getApplicationById(id: string) {
    const found = await this.applicationsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return found;
  }

  createApplication(createApplicationDto: CreateApplicationDto) {
    return this.applicationsRepository.createApplication(createApplicationDto);
  }

  async updateApplication(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.applicationsRepository.update({ id }, updateApplicationDto);

    return this.getApplicationById(id);
  }

  async deleteApplication(id: string) {
    const result = await this.applicationsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}
