import { Injectable, Logger } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetApplicationsFilterDto } from './dto/get-applications-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import ApplicationNotFoundException from './exceptions/applicationNotFound.exception';
import { getEntities } from '../../utils/getEntities';

@Injectable()
export class ApplicationsService {
  private logger = new Logger(ApplicationsService.name);

  constructor(
    @InjectRepository(Application)
    public applicationsRepository: Repository<Application>,
  ) {}

  async getApplications(filterDto: GetApplicationsFilterDto) {
    return getEntities(this.applicationsRepository, filterDto);
  }

  async getApplicationById(id: string) {
    const found = await this.applicationsRepository.findOne({ where: { id }, loadRelationIds: true });

    if (!found) {
      throw new ApplicationNotFoundException(id);
    }

    return found;
  }

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const application = this.applicationsRepository.create(createApplicationDto);

    await this.applicationsRepository.save(application);
    return application;
  }

  async updateApplication(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.applicationsRepository.update(id, updateApplicationDto);
    const updatedApplication = await this.applicationsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedApplication) {
      return updatedApplication;
    }
    throw new ApplicationNotFoundException(id);
  }

  async deleteApplication(id: string) {
    const result = await this.applicationsRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new ApplicationNotFoundException(id);
    }
  }

  async deleteAllApplications() {
    await this.applicationsRepository.delete({});
  }
}
