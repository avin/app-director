import React, { ReactNode, useEffect, useState } from 'react';
import { AppThunkAction, AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

export type EntityFetcherRenderParams<TEntity> = {
  isLoading: boolean;
  entity: TEntity | undefined;
};

interface Props<TEntity> {
  entityByIdSelector: (
    state: RootState,
    entityId: string,
  ) => TEntity | undefined;
  entityGetter: (entityId: string) => AppThunkAction<Promise<TEntity>>;
  render: (params: EntityFetcherRenderParams<TEntity>) => ReactNode;
  entityId: string;
}

const EntityFetcher = <TEntity,>({
  entityId,
  entityByIdSelector,
  entityGetter,
  render,
}: Props<TEntity>) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const entity = useSelector((state: RootState) =>
    entityByIdSelector(state, entityId),
  );
  const [isEntityFetched, setIsEntityFetched] = useState(!!entity);

  useEffect(() => {
    void (async () => {
      if (isEntityFetched) {
        return;
      }
      try {
        await dispatch(entityGetter(entityId));
      } finally {
        setIsEntityFetched(true);
      }
    })();
  }, [entityId, dispatch, isEntityFetched, entityGetter]);

  return (
    <>
      {render({
        isLoading: !isEntityFetched,
        entity,
      })}
    </>
  );
};

export default EntityFetcher;
