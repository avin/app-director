import { SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export const qbSearchLike = <TEntity extends ObjectLiteral>(
  qb: SelectQueryBuilder<TEntity>,
  { columns, search }: { columns: string[]; search: string },
) => {
  qb.andWhere(
    '(' +
      columns
        .map((str) => {
          return `LOWER(${str}) LIKE LOWER(:search)`;
        }, '')
        .join(' OR ') +
      ')',
    {
      search: `%${search}%`,
    },
  );
};
