import { Repository, SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export const getEntities = async <
  TEntity extends ObjectLiteral,
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
