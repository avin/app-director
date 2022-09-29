import { useMemo } from 'react';
import { get, set } from 'lodash-es';
import { FieldConfig } from '@/types';
import { getUrlQueryParam } from '@/utils/getUrlQueryParam';

export const useEntityFormDefaultValues = (
  entity: Record<string, any>,
  fields: FieldConfig[],
): Record<string, any> => {
  return useMemo(() => {
    let result = fields.reduce((acc, field) => {
      set(acc, field.id, get(entity, field.id, field.defaultValue));
      return acc;
    }, {});

    console.log(result);

    const queryParamsDefaultValuesStr = getUrlQueryParam('defaultValues');
    if (queryParamsDefaultValuesStr) {
      try {
        result = {
          ...result,
          ...JSON.parse(queryParamsDefaultValuesStr),
        } as Record<string, any>;
      } catch {}
    }
    return result;
  }, [entity, fields]);
};
