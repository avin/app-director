import { useMemo } from 'react';

export const useDefaultRequiredRules = ({ required = true } = {}) => {
  return useMemo(
    () => ({
      validate: (val) => {
        if (!required && !val) {
          return;
        }
        if (!val) {
          return 'fieldRequired';
        }

        return undefined;
      },
    }),
    [required],
  );
};
