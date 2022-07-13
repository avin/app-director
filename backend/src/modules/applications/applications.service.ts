import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetApplicationsFilterDto } from './dto/get-applications-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { PgErrors } from '../../constants/pgErrors';

@Injectable()
export class ApplicationsService {
  private logger = new Logger(ApplicationsService.name);

  constructor(
    @InjectRepository(Application)
    public applicationsRepository: Repository<Application>,
  ) {}

  async getApplications(filterDto: GetApplicationsFilterDto) {
    const { search } = filterDto;

    const query = this.applicationsRepository.createQueryBuilder('application');

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

  async getApplicationById(id: string) {
    const found = await this.applicationsRepository.findOne({ where: { id }, relations: ['stands'] });

    if (!found) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return found;
  }

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const application = this.applicationsRepository.create(createApplicationDto);

    await this.applicationsRepository.save(application);
    return application;
  }

  async updateApplication(id: string, updateApplicationDto: UpdateApplicationDto) {
    try {
      const result = await this.applicationsRepository
        .createQueryBuilder()
        .update(updateApplicationDto)
        .where({
          id,
        })
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      if (error.code === PgErrors.INVALID_TEXT_REPRESENTATION) {
        throw new BadRequestException('Invalid ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteApplication(id: string) {
    const result = await this.applicationsRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }

  async deleteAllApplications() {
    await this.applicationsRepository.delete({});
  }
}
