import { Injectable, Logger } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/CreateOrganizationDto';
import { GetOrganizationsFilterDto } from './dto/GetOrganizationsFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrganizationDto } from './dto/UpdateOrganizationDto';
import { Repository } from 'typeorm';
import { Organization } from './Organization';
import OrganizationNotFoundException from './exceptions/OrganizationNotFoundException';
import { getEntities } from '../../utils/getEntities';
import { Stand } from '../stands/Stand';
import { qbSearchLike } from '../../utils/qbSearchLike';

@Injectable()
export class OrganizationsService {
  private logger = new Logger(OrganizationsService.name);

  constructor(
    @InjectRepository(Organization)
    public organizationsRepository: Repository<Organization>,
  ) {}

  async getOrganizations(filterDto: GetOrganizationsFilterDto) {
    return getEntities(this.organizationsRepository, filterDto, (qb) => {
      if (filterDto.search) {
        qbSearchLike(qb, {
          columns: ['entity.title', 'entity.description'],
          search: filterDto.search,
        });
      }

      switch (filterDto.orderBy) {
        case 'title':
        case 'description':
        case 'createdAt':
        case 'updatedAt':
          qb.orderBy(`entity.${filterDto.orderBy}`, filterDto.orderDirection);
          break;
        case 'standsCount':
          qb.addSelect((subQuery) => {
            return subQuery
              .select('COUNT(stand.id)', 'count')
              .from(Stand, 'stand')
              .where('stand.organization.id = entity.id');
          }, 'count').orderBy('count', filterDto.orderDirection);
          break;
      }
    });
  }

  async getOrganizationById(id: string) {
    const found = await this.organizationsRepository.findOne({ where: { id }, relations: ['stands'] });

    if (!found) {
      throw new OrganizationNotFoundException(id);
    }

    return found;
  }

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationsRepository.create(createOrganizationDto);

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
