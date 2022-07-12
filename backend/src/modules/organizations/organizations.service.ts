import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationsFilterDto } from './dto/get-organizations-filter.dto';
import { OrganizationsRepository } from './organizations.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsRepository)
    private organizationsRepository: OrganizationsRepository,
  ) {}

  getOrganizations(filterDto: GetOrganizationsFilterDto) {
    return this.organizationsRepository.getOrganizations(filterDto);
  }

  async getOrganizationById(id: string) {
    const found = await this.organizationsRepository.findOne({ where: { id }, relations: ['stands'] });

    if (!found) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }

    return found;
  }

  createOrganization(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsRepository.createOrganization(createOrganizationDto);
  }

  async updateOrganization(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsRepository.updateOrganization(id, updateOrganizationDto);
  }

  async deleteOrganization(id: string) {
    const result = await this.organizationsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }
  }

  async deleteAllOrganizations() {
    await this.organizationsRepository.delete({});
  }
}
