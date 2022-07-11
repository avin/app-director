import { EntityRepository, Repository } from 'typeorm';
import { CreateStandDto } from './dto/create-stand.dto';
import { GetStandsFilterDto } from './dto/get-stands-filter.dto';
import { Stand } from './stand.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Application } from '../applications/application.entity';

@EntityRepository(Stand)
export class StandsRepository extends Repository<Stand> {
  private logger = new Logger('StandsRepository');

  async getStands(filterDto: GetStandsFilterDto) {
    const { search } = filterDto;

    const query = this.createQueryBuilder('stand');

    if (search) {
      query
        .andWhere('(LOWER(stand.title) LIKE LOWER(:search) OR LOWER(stand.description) LIKE LOWER(:search))', {
          search: `%${search}%`,
        })
        .leftJoinAndSelect('stand.applicationId', 'applications');
    }

    try {
      const stands = await query.getMany();
      return stands;
    } catch (error) {
      this.logger.error(`Failed to get stands". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createStand(createStandDto: CreateStandDto) {
    const stand = this.create({
      ...createStandDto,
    });

    await this.save(stand);
    return stand;
  }
}
