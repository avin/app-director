import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { GetStandsFilterDto } from './dto/get-stands-filter.dto';
import { StandsRepository } from './stands.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStandDto } from './dto/update-stand.dto';

@Injectable()
export class StandsService {
  constructor(
    @InjectRepository(StandsRepository)
    private standsRepository: StandsRepository,
  ) {}

  getStands(filterDto: GetStandsFilterDto) {
    return this.standsRepository.getStands(filterDto);
  }

  async getStandById(id: string) {
    const found = await this.standsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Stand with ID "${id}" not found`);
    }

    return found;
  }

  createStand(createStandDto: CreateStandDto) {
    return this.standsRepository.createStand(createStandDto);
  }

  async updateStand(id: string, updateStandDto: UpdateStandDto) {
    return this.standsRepository.updateStand(id, updateStandDto);
  }

  async deleteStand(id: string) {
    const result = await this.standsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Stand with ID "${id}" not found`);
    }
  }

  async deleteAllStands() {
    await this.standsRepository.delete({});
  }
}
