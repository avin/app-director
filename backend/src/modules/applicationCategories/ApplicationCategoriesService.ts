import { Injectable, Logger } from '@nestjs/common';
import { CreateApplicationCategoryDto } from './dto/CreateApplicationCategoryDto';
import { GetApplicationCategoriesFilterDto } from './dto/GetApplicationCategoriesFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationCategoryDto } from './dto/UpdateApplicationCategoryDto';
import { Repository } from 'typeorm';
import { ApplicationCategory } from './ApplicationCategory';
import ApplicationCategoryNotFoundException from './exceptions/ApplicationCategoryNotFoundException';
import { getEntities } from '../../utils/getEntities';
import { Application } from '../applications/Application';
import { qbSearchLike } from '../../utils/qbSearchLike';

@Injectable()
export class ApplicationCategoriesService {
  private logger = new Logger(ApplicationCategoriesService.name);

  constructor(
    @InjectRepository(ApplicationCategory)
    public applicationCategoriesRepository: Repository<ApplicationCategory>,
  ) {}

  async getApplicationCategories(filterDto: GetApplicationCategoriesFilterDto) {
    return getEntities(this.applicationCategoriesRepository, filterDto, (qb) => {
      if (filterDto.search) {
        qbSearchLike(qb, {
          columns: ['entity.title'],
          search: filterDto.search,
        });
      }

      switch (filterDto.orderBy) {
        case 'title':
        case 'createdAt':
        case 'updatedAt':
          qb.orderBy(`entity.${filterDto.orderBy}`, filterDto.orderDirection);
          break;
        case 'applicationsCount':
          qb.addSelect((subQuery) => {
            return subQuery
              .select('COUNT(application.id)', 'count')
              .from(Application, 'application')
              .where('application.applicationCategory.id = entity.id');
          }, 'count').orderBy('count', filterDto.orderDirection);
          break;
      }
    });
  }

  async getApplicationCategoryById(id: string) {
    const found = await this.applicationCategoriesRepository.findOne({ where: { id }, loadRelationIds: true });

    if (!found) {
      throw new ApplicationCategoryNotFoundException(id);
    }

    return found;
  }

  async createApplicationCategory(createApplicationCategoryDto: CreateApplicationCategoryDto) {
    const applicationCategory = this.applicationCategoriesRepository.create(createApplicationCategoryDto);

    await this.applicationCategoriesRepository.save(applicationCategory);
    return applicationCategory;
  }

  async updateApplicationCategory(id: string, updateApplicationCategoryDto: UpdateApplicationCategoryDto) {
    await this.applicationCategoriesRepository.update(id, updateApplicationCategoryDto);
    const updatedApplicationCategory = await this.applicationCategoriesRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedApplicationCategory) {
      return updatedApplicationCategory;
    }
    throw new ApplicationCategoryNotFoundException(id);
  }

  async deleteApplicationCategory(id: string) {
    const result = await this.applicationCategoriesRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new ApplicationCategoryNotFoundException(id);
    }
  }

  async deleteAllApplicationCategories() {
    await this.applicationCategoriesRepository.delete({});
  }
}
