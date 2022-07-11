import { EntityRepository, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationsFilterDto } from './dto/get-organizations-filter.dto';
import { Organization } from './organization.entity';
import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PgErrors } from '../../constants/pgErrors';

@EntityRepository(Organization)
export class OrganizationsRepository extends Repository<Organization> {
  private logger = new Logger('OrganizationsRepository');

  async getOrganizations(filterDto: GetOrganizationsFilterDto) {
    const { search } = filterDto;

    const query = this.createQueryBuilder('organization');

    if (search) {
      query.andWhere(
        '(LOWER(organization.title) LIKE LOWER(:search) OR LOWER(organization.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const organizations = await query.getMany();
      return organizations;
    } catch (error) {
      this.logger.error(`Failed to get organizations". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    const { title, description } = createOrganizationDto;

    const organization = this.create({
      title,
      description,
    });

    await this.save(organization);
    return organization;
  }

  async updateOrganization(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      const result = await this.createQueryBuilder()
        .update(updateOrganizationDto)
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
}
