import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateStandDto } from './dto/CreateStandDto';
import { GetStandsFilterDto } from './dto/GetStandsFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStandDto } from './dto/UpdateStandDto';
import { Repository } from 'typeorm';
import { Stand } from './Stand';
import StandNotFoundException from './exceptions/StandNotFoundException';
import { getEntities } from '../../utils/getEntities';
import { qbSearchLike } from '../../utils/qbSearchLike';

@Injectable()
export class StandsService {
  private logger = new Logger(StandsService.name);

  constructor(
    @InjectRepository(Stand)
    public standsRepository: Repository<Stand>,
  ) {}

  async getStands(filterDto: GetStandsFilterDto) {
    return getEntities(this.standsRepository, filterDto, (qb) => {
      if (filterDto.applicationId) {
        qb.andWhere('entity.applicationId = :id', {
          id: filterDto.applicationId,
        });
      }
      if (filterDto.organizationId) {
        qb.andWhere('entity.organizationId = :id', {
          id: filterDto.organizationId,
        });
      }
      if (filterDto.standCategoryId) {
        qb.andWhere('entity.standCategoryId = :id', {
          id: filterDto.standCategoryId,
        });
      }

      qb.innerJoinAndSelect('entity.application', 'application')
        .innerJoinAndSelect('entity.organization', 'organization')
        .innerJoinAndSelect('entity.standCategory', 'standCategory');

      if (filterDto.search) {
        qbSearchLike(qb, {
          columns: [
            'entity.title',
            'application.title',
            'organization.title',
            'standCategory.title',
          ],
          search: filterDto.search,
        });
      }

      switch (filterDto.orderBy) {
        case 'title':
        case 'createdAt':
        case 'updatedAt':
          qb.orderBy(`entity.${filterDto.orderBy}`, filterDto.orderDirection);
          break;
        case 'standCategory':
          qb.orderBy('standCategory.title', filterDto.orderDirection);
          break;
        case 'application':
          qb.orderBy('application.title', filterDto.orderDirection);
          break;
        case 'organization':
          qb.orderBy('organization.title', filterDto.orderDirection);
          break;
      }
    });
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
