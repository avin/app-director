export const entitiesArrayToMap = <T extends { id: string }>(entitiesArr: T[]): Record<string, T> => {
  return entitiesArr.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};
