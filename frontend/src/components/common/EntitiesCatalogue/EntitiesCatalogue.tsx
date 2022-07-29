import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import styles from './EntitiesCatalogue.module.scss';
import { HTMLTable, Spinner } from '@blueprintjs/core';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { wait } from '@/utils/wait';

export type RowBuilderParams<TEntity> = {
  id: string;
  entity: TEntity;
};

interface Props<TEntity> {
  headBuilder: () => React.ReactNode;
  rowBuilder: (params: RowBuilderParams<TEntity>) => React.ReactNode;
  getEntities: () => Promise<{ ids: string[]; count: number }>;
  entitiesSelector: (state: RootState) => Record<string, TEntity>;
}

const EntitiesCatalogue = <TEntity,>({ headBuilder, rowBuilder, getEntities, entitiesSelector }: Props<TEntity>) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [isDataFetchFailed, setIsDataFetchFailed] = useState(false);
  const entities = useSelector(entitiesSelector);

  const [entitiesIds, setEntitiesIds] = useState<string[]>([]);
  const [entitiesCount, setEntitiesCount] = useState<null | number>(null);

  useEffect(() => {
    void (async () => {
      try {
        const { ids, count } = await getEntities();
        setEntitiesIds(ids);
        setEntitiesCount(count);
      } catch (error) {
        setIsDataFetchFailed(true);
      }
    })();
  }, [dispatch, getEntities]);

  if (isDataFetchFailed) {
    return <div>Something wrong</div>;
  }

  return (
    <HTMLTable striped bordered interactive condensed className={styles.table}>
      <thead>{headBuilder()}</thead>

      <tbody>
        {entitiesCount === null && (
          <tr className={styles.notInteractive}>
            <td colSpan={1000}>
              <div className={styles.loadingTdContent}>
                <Spinner size={20} />
              </div>
            </td>
          </tr>
        )}

        {entitiesCount === 0 && (
          <tr className={styles.notInteractive}>
            <td colSpan={1000}>
              <div className={styles.noItemsTdContent}>Ничего не найдено</div>
            </td>
          </tr>
        )}

        {!!entitiesCount &&
          entitiesIds.map((id) =>
            rowBuilder({
              id,
              entity: entities[id],
            }),
          )}
      </tbody>
    </HTMLTable>
  );
};

export default EntitiesCatalogue;
