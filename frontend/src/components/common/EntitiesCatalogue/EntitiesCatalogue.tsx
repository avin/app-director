import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  getEntities: (filter: any) => Promise<{ ids: string[]; count: number }>;
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
  const tableContainerElRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [entitiesIds, setEntitiesIds] = useState<string[]>([]);
  const [entitiesCount, setEntitiesCount] = useState<null | number>(null);

  useEffect(() => {
    void (async () => {
      try {
        let limit: number | undefined;
        if (tableContainerElRef.current) {
          limit = Math.floor(tableContainerElRef.current.clientHeight / 30) + 10;
        }

        const { ids, count } = await getEntities({ limit });
        setEntitiesIds(ids);
        setEntitiesCount(count);
      } catch (error) {
        setIsDataFetchFailed(true);
      }
    })();
  }, [dispatch, getEntities]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }
    if (entitiesIds.length === entitiesCount) {
      return;
    }
    setIsLoadingMore(true);
    try {
      const { ids, count } = await getEntities({ limit: 20, offset: entitiesIds.length });
      setEntitiesIds([...entitiesIds, ...ids]);
      setEntitiesCount(count);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, entitiesIds, entitiesCount, getEntities]);

  const handleScrollTableContainer = useCallback(() => {
    const tableContainerEl = tableContainerElRef.current;
    if (!tableContainerEl) {
      return;
    }
    if (tableContainerEl.scrollTop + tableContainerEl.clientHeight >= tableContainerEl.scrollHeight - 200) {
      void loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('resize', handleScrollTableContainer);
    return () => {
      window.removeEventListener('resize', handleScrollTableContainer);
    };
  }, [handleScrollTableContainer]);

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
        <div className={styles.tableContainer} onScroll={handleScrollTableContainer} ref={tableContainerElRef}>
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
