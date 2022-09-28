export const getIdsFromEntitiesArray = <T extends { id: string }>(
  entitiesArr: T[],
): string[] => {
  return entitiesArr.map((i) => i.id);
};
