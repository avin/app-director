import { Injectable, Logger } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationsFilterDto } from './dto/get-organizations-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import OrganizationNotFoundException from './exceptions/organizationNotFound.exception';
import { getEntities } from '../../utils/getEntities';

@Injectable()
export class OrganizationsService {
  private logger = new Logger(OrganizationsService.name);

  constructor(
    @InjectRepository(Organization)
    public organizationsRepository: Repository<Organization>,
  ) {}

  async getOrganizations(filterDto: GetOrganizationsFilterDto) {
    return getEntities(this.organizationsRepository, filterDto);
  }

  async getOrganizationById(id: string) {
    const found = await this.organizationsRepository.findOne({ where: { id }, relations: ['stands'] });

    if (!found) {
      throw new OrganizationNotFoundException(id);
    }

    return found;
  }

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    const { title, description } = createOrganizationDto;

    const organization = this.organizationsRepository.create({
      title,
      description,
    });

    await this.organizationsRepository.save(organization);
    return organization;
  }

  async updateOrganization(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationsRepository.update(id, updateOrganizationDto);
    const updatedOrganization = await this.organizationsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedOrganization) {
      return updatedOrganization;
    }
    throw new OrganizationNotFoundException(id);
  }

  async deleteOrganization(id: string) {
    const result = await this.organizationsRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new OrganizationNotFoundException(id);
    }
  }

  async deleteAllOrganizations() {
    await this.organizationsRepository.delete({});
  }
}
