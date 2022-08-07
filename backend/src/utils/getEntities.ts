import { Repository, SelectQueryBuilder } from 'typeorm';

export const getEntities = async <
  TEntity,
  TFilterDto extends {
    limit?: number;
    offset?: number;
    search?: string;
    orderBy: string;
    ids?: string[];
    orderDirection: 'ASC' | 'DESC';
  },
>(
  repository: Repository<TEntity>,
  filterDto: TFilterDto,
  query?: (qb: SelectQueryBuilder<TEntity>) => void,
) => {
  const qb = repository.createQueryBuilder('entity');

  if (filterDto.search) {
    qb.andWhere('(LOWER(entity.title) LIKE LOWER(:search) OR LOWER(entity.description) LIKE LOWER(:search))', {
      search: `%${filterDto.search}%`,
    });
  }

  if (filterDto.ids) {
    qb.andWhere('entity.id IN (:...ids)', { ids: filterDto.ids });
  }

  if (query) {
    query(qb);
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
