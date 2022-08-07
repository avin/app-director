import { Injectable, Logger } from '@nestjs/common';
import { CreateApplicationDto } from './dto/CreateApplicationDto';
import { GetApplicationsFilterDto } from './dto/GetApplicationsFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationDto } from './dto/UpdateApplicationDto';
import { Repository } from 'typeorm';
import { Application } from './Application';
import ApplicationNotFoundException from './exceptions/ApplicationNotFoundException';
import { getEntities } from '../../utils/getEntities';
import { Stand } from '../stands/Stand';

@Injectable()
export class ApplicationsService {
  private logger = new Logger(ApplicationsService.name);

  constructor(
    @InjectRepository(Application)
    public applicationsRepository: Repository<Application>,
  ) {}

  async getApplications(filterDto: GetApplicationsFilterDto) {
    return getEntities(this.applicationsRepository, filterDto, (qb) => {
      if (filterDto.applicationCategoryId) {
        qb.andWhere('entity.applicationCategoryId = :id', { id: filterDto.applicationCategoryId });
      }

      switch (filterDto.orderBy) {
        case 'title':
        case 'description':
        case 'createdAt':
        case 'updatedAt':
          qb.orderBy(`entity.${filterDto.orderBy}`, filterDto.orderDirection);
          break;
        case 'applicationCategory':
          qb.leftJoinAndSelect('entity.applicationCategory', 'applicationCategory').orderBy(
            'applicationCategory.title',
            filterDto.orderDirection,
          );
          break;
        case 'standsCount':
          qb.addSelect((subQuery) => {
            return subQuery
              .select('COUNT(stand.id)', 'count')
              .from(Stand, 'stand')
              .where('stand.application.id = entity.id');
          }, 'count').orderBy('count', filterDto.orderDirection);
          break;
      }
    });
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
