import { SyntheticEvent, useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

export const useHandleClickCatalogueRow = (
  viewEntityRoutePath: string,
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void,
) => {
  const navigate = useNavigate();

  const defaultOnClickRow = useCallback(
    (entityId: string) => {
      navigate(generatePath(viewEntityRoutePath, { id: entityId }));
    },
    [navigate, viewEntityRoutePath],
  );

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      const onClickRowFunc = onClickRow || defaultOnClickRow;
      onClickRowFunc(entityId, e);
    },
    [defaultOnClickRow, onClickRow],
  );

  return handleClickRow;
};
