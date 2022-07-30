import React, { useEffect, useState } from 'react';
import { AppThunkAction, AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { RootState } from '@/store/reducers';

interface Props<TEntity> {
  entityByIdSelector: (state: RootState, entityId: string) => TEntity;
  entityGetter: (entityId: string) => AppThunkAction<Promise<TEntity>>;
}

const EntityFetcher = <TEntity,>({ entityByIdSelector, entityGetter }: Props<TEntity>) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const entityId = useParams().id as string;
  const entity = useSelector((state: RootState) => entityByIdSelector(state, entityId));
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

  if (!isEntityFetched) {
    return <div>Loading...</div>;
  }

  if (isEntityFetched && !entity) {
    return <div>Not found</div>;
  }

  return <Outlet />;
};

export default EntityFetcher;
