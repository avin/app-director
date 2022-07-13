import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { GetStandsFilterDto } from './dto/get-stands-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStandDto } from './dto/update-stand.dto';
import { Repository } from 'typeorm';
import { Stand } from './stand.entity';

@Injectable()
export class StandsService {
  private logger = new Logger(StandsService.name);

  constructor(
    @InjectRepository(Stand)
    public standsRepository: Repository<Stand>,
  ) {}

  async getStands(filterDto: GetStandsFilterDto) {
    const { search } = filterDto;

    const query = this.standsRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere('(LOWER(user.title) LIKE LOWER(:search) OR LOWER(user.description) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      this.logger.error(`Failed to get stands. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getStandById(id: string) {
    const found = await this.standsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Stand with ID "${id}" not found`);
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
    const updatedPost = await this.standsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new BadRequestException('Invalid ID');
  }

  async deleteStand(id: string) {
    const result = await this.standsRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Stand with ID "${id}" not found`);
    }
  }

  async deleteAllStands() {
    await this.standsRepository.delete({});
  }
}
