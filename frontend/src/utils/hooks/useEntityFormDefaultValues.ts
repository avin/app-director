import { useMemo } from 'react';
import { get, set } from 'lodash-es';
import { FieldConfig } from '@/types';

export const useEntityFormDefaultValues = (
  entity: Record<string, any>,
  fields: FieldConfig[],
) => {
  return useMemo(() => {
    return fields.reduce((acc, field) => {
      set(acc, field.name, get(entity, field.name));
      return acc;
    }, {});
  }, [entity, fields]);
};
