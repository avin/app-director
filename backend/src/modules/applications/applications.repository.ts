import { EntityRepository, Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetApplicationsFilterDto } from './dto/get-applications-filter.dto';
import { Application } from './application.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Application)
export class ApplicationsRepository extends Repository<Application> {
  private logger = new Logger('ApplicationsRepository');

  async getApplications(filterDto: GetApplicationsFilterDto) {
    const { search } = filterDto;

    const query = this.createQueryBuilder('application');

    if (search) {
      query.andWhere(
        '(LOWER(application.title) LIKE LOWER(:search) OR LOWER(application.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const applications = await query.getMany();
      return applications;
    } catch (error) {
      this.logger.error(`Failed to get applications". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const { title, description } = createApplicationDto;

    const application = this.create({
      title,
      description,
    });

    await this.save(application);
    return application;
  }
}
