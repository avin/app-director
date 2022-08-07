import { SelectQueryBuilder } from 'typeorm';

export const qbSearchLike = <TEntity>(
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
