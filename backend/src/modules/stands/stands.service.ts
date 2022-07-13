import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { GetStandsFilterDto } from './dto/get-stands-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStandDto } from './dto/update-stand.dto';
import { Repository } from 'typeorm';
import { Stand } from './stand.entity';
import StandNotFoundException from './exceptions/standNotFound.exception';

@Injectable()
export class StandsService {
  private logger = new Logger(StandsService.name);

  constructor(
    @InjectRepository(Stand)
    public standsRepository: Repository<Stand>,
  ) {}

  async getStands(filterDto: GetStandsFilterDto) {
    const { search } = filterDto;

    const query = this.standsRepository.createQueryBuilder('stand');

    if (search) {
      query.andWhere('(LOWER(user.title) LIKE LOWER(:search) OR LOWER(user.description) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(`Failed to get stands. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getStandById(id: string) {
    const found = await this.standsRepository.findOne({ where: { id } });

    if (!found) {
      throw new StandNotFoundException(id);
    }

    return found;
  }

  async createStand(createStandDto: CreateStandDto) {
    const application = this.standsRepository.create(createStandDto);

    await this.standsRepository.save(application);
    return application;
  }

  async updateStand(id: string, updateStandDto: UpdateStandDto) {
    await this.standsRepository.update(id, updateStandDto);
    const updatedStand = await this.standsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedStand) {
      return updatedStand;
    }
    throw new BadRequestException('Invalid ID');
  }

  async deleteStand(id: string) {
    const result = await this.standsRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new StandNotFoundException(id);
    }
  }

  async deleteAllStands() {
    await this.standsRepository.delete({});
  }
}
