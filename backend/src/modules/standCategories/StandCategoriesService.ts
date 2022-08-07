import { Injectable, Logger } from '@nestjs/common';
import { CreateStandCategoryDto } from './dto/CreateStandCategoryDto';
import { GetStandCategoriesFilterDto } from './dto/GetStandCategoriesFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStandCategoryDto } from './dto/UpdateStandCategoryDto';
import { Repository } from 'typeorm';
import { StandCategory } from './StandCategory';
import StandCategoryNotFoundException from './exceptions/StandCategoryNotFoundException';
import { getEntities } from '../../utils/getEntities';

@Injectable()
export class StandCategoriesService {
  private logger = new Logger(StandCategoriesService.name);

  constructor(
    @InjectRepository(StandCategory)
    public standCategoriesRepository: Repository<StandCategory>,
  ) {}

  async getStandCategories(filterDto: GetStandCategoriesFilterDto) {
    return getEntities(this.standCategoriesRepository, filterDto, (qb) => {
      switch (filterDto.orderBy) {
        case 'title':
        case 'description':
        case 'createdAt':
        case 'updatedAt':
          qb.orderBy(`entity.${filterDto.orderBy}`, filterDto.orderDirection);
          break;
      }
    });
  }

  async getStandCategoryById(id: string) {
    const found = await this.standCategoriesRepository.findOne({ where: { id }, loadRelationIds: true });

    if (!found) {
      throw new StandCategoryNotFoundException(id);
    }

    return found;
  }

  async createStandCategory(createStandCategoryDto: CreateStandCategoryDto) {
    const standCategory = this.standCategoriesRepository.create(createStandCategoryDto);

    await this.standCategoriesRepository.save(standCategory);
    return standCategory;
  }

  async updateStandCategory(id: string, updateStandCategoryDto: UpdateStandCategoryDto) {
    await this.standCategoriesRepository.update(id, updateStandCategoryDto);
    const updatedStandCategory = await this.standCategoriesRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedStandCategory) {
      return updatedStandCategory;
    }
    throw new StandCategoryNotFoundException(id);
  }

  async deleteStandCategory(id: string) {
    const result = await this.standCategoriesRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new StandCategoryNotFoundException(id);
    }
  }

  async deleteAllStandCategories() {
    await this.standCategoriesRepository.delete({});
  }
}
