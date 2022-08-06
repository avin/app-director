import React, { useEffect, useState } from 'react';
import styles from './EntitiesCatalogue.module.scss';
import { Button, HTMLTable, Intent, Spinner } from '@blueprintjs/core';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Link } from 'react-router-dom';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import FitPage from '../FitPage/FitPage';

export type RowBuilderParams<TEntity> = {
  id: string;
  entity: TEntity;
};
export type HeadColumn = {
  id: string;
  label: React.ReactNode;
};

interface Props<TEntity> {
  addEntityRoute?: string;
  headColumns: HeadColumn[];
  rowBuilder: (params: RowBuilderParams<TEntity>) => React.ReactNode;
  getEntities: () => Promise<{ ids: string[]; count: number }>;
  entitiesSelector: (state: RootState) => Record<string, TEntity>;
  onClose?: () => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const EntitiesCatalogue = <TEntity,>({
  addEntityRoute,
  headColumns,
  rowBuilder,
  getEntities,
  entitiesSelector,
  onClose,
  viewHeaderProps,
}: Props<TEntity>) => {
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
    <div className={styles.main}>
      <ViewHeader
        controls={
          addEntityRoute && (
            <Link to={addEntityRoute} tabIndex={-1}>
              <Button intent={Intent.PRIMARY} icon="plus">
                Добавить
              </Button>
            </Link>
          )
        }
        {...viewHeaderProps}
      />
      <FitPage minHeight={100}>
        <div className={styles.tableContainer}>
          <HTMLTable striped bordered interactive condensed className={styles.table}>
            <thead>
              <tr>
                {headColumns.map(({ label, id }) => (
                  <th key={id}>{label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {entitiesCount === null && (
                <tr className={styles.notInteractive}>
                  <td colSpan={1000}>
                    <div className={styles.loadingTdContent}>
                      <Spinner size={18} />
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
        </div>
      </FitPage>
    </div>
  );
};

export default EntitiesCatalogue;
