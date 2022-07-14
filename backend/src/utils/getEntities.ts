import { Repository } from 'typeorm';

export const getEntities = async <
  TEntity,
  TFilterDto extends {
    limit?: number;
    offset?: number;
    search?: string;
    orderBy: string;
    orderDirection: 'ASC' | 'DESC';
  },
>(
  repository: Repository<TEntity>,
  filterDto: TFilterDto,
) => {
  const qb = repository.createQueryBuilder('application');

  qb.orderBy(`application.${filterDto.orderBy}`, filterDto.orderDirection);

  if (filterDto.search) {
    qb.andWhere(
      '(LOWER(application.title) LIKE LOWER(:search) OR LOWER(application.description) LIKE LOWER(:search))',
      { search: `%${filterDto.search}%` },
    );
  }

  const itemsCount = await qb.getCount();

  if ('limit' in filterDto) {
    qb.limit(filterDto.limit);
  }

  if ('offset' in filterDto) {
    qb.offset(filterDto.offset);
  }

  const items = await qb.loadAllRelationIds().getMany();

  return { items, count: itemsCount };
};
