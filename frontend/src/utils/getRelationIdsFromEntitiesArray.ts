export const getRelationIdsFromEntitiesArray = <
  TEntity extends { [K in keyof TEntity]: unknown },
>(
  entities: TEntity[],
  relationEntityField: keyof TEntity,
): string[] => {
  const idsSet = entities.reduce((acc, item) => {
    const value = item[relationEntityField];
    if (value instanceof Array) {
      for (const id of value) {
        acc.add(id as string);
      }
    } else if (typeof value === 'string') {
      acc.add(item[relationEntityField] as string);
    }

    return acc;
  }, new Set<string>());
  return Array.from(idsSet);
};
