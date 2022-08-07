import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './EntitiesCatalogue.module.scss';
import { Button, HTMLTable, Intent, Spinner } from '@blueprintjs/core';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Link, useSearchParams } from 'react-router-dom';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import FitPage from '../FitPage/FitPage';
import SortIndicator from '@/components/common/EntitiesCatalogue/SortIndicator/SortIndicator';
import { SortingDirection } from '@/types';
import Search from '@/components/common/EntitiesCatalogue/Search/Search';
import queryString from 'query-string';
import Mark from 'mark.js';
import { usePrevious } from '@/utils/hooks/usePrevious';

export type RowBuilderParams<TEntity> = {
  id: string;
  entity: TEntity;
};
export type HeadColumn = {
  id: string;
  label: React.ReactNode;
  sortable?: boolean;
};

interface Props<TEntity> {
  addEntityRoute?: string;
  headColumns: HeadColumn[];
  rowBuilder: (params: RowBuilderParams<TEntity>) => React.ReactNode;
  getEntities: (filter: any) => Promise<{ ids: string[]; count: number }>;
  entitiesSelector: (state: RootState) => Record<string, TEntity>;
  onClose?: () => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  defaultSortingColumnId?: string;
  defaultSortingDirection?: SortingDirection;
}

const EntitiesCatalogue = <TEntity,>({
  addEntityRoute,
  headColumns,
  rowBuilder,
  getEntities,
  entitiesSelector,
  onClose,
  viewHeaderProps,
  defaultSortingColumnId,
  defaultSortingDirection = 'ASC',
}: Props<TEntity>) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [isDataFetchFailed, setIsDataFetchFailed] = useState(false);
  const entities = useSelector(entitiesSelector);
  const tableContainerElRef = useRef<HTMLDivElement>(null);
  const markInstanceRef = useRef<Mark | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [entitiesIds, setEntitiesIds] = useState<string[]>([]);
  const [entitiesCount, setEntitiesCount] = useState<null | number>(null);
  const [sorting, setSorting] = useState<{ columnId: string | undefined; direction: SortingDirection }>({
    columnId: defaultSortingColumnId,
    direction: defaultSortingDirection,
  });
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const prevEntitiesIds = usePrevious(entitiesIds);

  // Highlight search substrings
  useEffect(() => {
    if (prevEntitiesIds !== entitiesIds) {
      if (!tableContainerElRef.current) {
        return;
      }
      markInstanceRef.current = markInstanceRef.current || new Mark(tableContainerElRef.current);
      markInstanceRef.current.unmark({
        done: () => {
          if (markInstanceRef.current && searchValue) {
            markInstanceRef.current.mark(searchValue);
          }
        },
      });
    }
  }, [entitiesIds, prevEntitiesIds, searchValue]);

  // Set search string as query-param in URL
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    parsed.search = searchValue;
    const queryResult = queryString.stringify(parsed, { skipEmptyString: true });
    window.history.replaceState(null, '', `${window.location.pathname}?${queryResult}`.replace(/\?$/, ''));
  }, [searchValue]);

  const entitiesFilter = useMemo(() => {
    return {
      ...(sorting.columnId && {
        orderBy: sorting.columnId,
        orderDirection: sorting.direction,
      }),
      ...(searchValue && {
        search: searchValue,
      }),
    };
  }, [searchValue, sorting.columnId, sorting.direction]);

  useEffect(() => {
    void (async () => {
      try {
        let limit: number | undefined;
        if (tableContainerElRef.current) {
          limit = Math.floor(tableContainerElRef.current.clientHeight / 30) + 10;
        }

        const { ids, count } = await getEntities({
          ...entitiesFilter,
          limit,
        });
        setEntitiesIds(ids);
        setEntitiesCount(count);
      } catch (error) {
        setIsDataFetchFailed(true);
      }
    })();
  }, [dispatch, entitiesFilter, getEntities, sorting]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }
    if (entitiesIds.length === entitiesCount) {
      return;
    }
    setIsLoadingMore(true);
    try {
      const { ids, count } = await getEntities({
        ...entitiesFilter,
        limit: 20,
        offset: entitiesIds.length,
      });
      setEntitiesIds([...entitiesIds, ...ids]);
      setEntitiesCount(count);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, entitiesIds, entitiesCount, getEntities, entitiesFilter]);

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

  const handleClickTh = useCallback((e: React.MouseEvent<HTMLTableCellElement>) => {
    const columnId = e.currentTarget.dataset.id as string;
    const sortable = e.currentTarget.dataset.sortable as 'true' | 'false';

    if (sortable === 'false') {
      return;
    }

    setSorting((curr) => {
      let direction: 'ASC' | 'DESC' = 'ASC';
      if (curr.columnId === columnId) {
        if (curr.direction === 'DESC') {
          direction = 'ASC';
        } else {
          direction = 'DESC';
        }
      }
      return {
        columnId,
        direction,
      };
    });
  }, []);

  if (isDataFetchFailed) {
    return <div>Something wrong</div>;
  }

  return (
    <div className={styles.main}>
      <ViewHeader
        controls={
          <>
            <Search onChange={setSearchValue} defaultValue={searchValue} />

            <div className="bp4-navbar-divider" />

            {addEntityRoute && (
              <Link to={addEntityRoute} tabIndex={-1}>
                <Button intent={Intent.PRIMARY} icon="plus">
                  Добавить
                </Button>
              </Link>
            )}
          </>
        }
        {...viewHeaderProps}
      />
      <FitPage minHeight={100}>
        <div className={styles.tableContainer} onScroll={handleScrollTableContainer} ref={tableContainerElRef}>
          <HTMLTable striped bordered interactive condensed className={styles.table}>
            <thead>
              <tr>
                {headColumns.map(({ label, id, sortable }) => (
                  <th key={id} onClick={handleClickTh} data-id={id} data-sortable={String(sortable || false)}>
                    {label}
                    {sortable && (
                      <SortIndicator
                        className={cn(styles.sortIndicator, {
                          [styles.active]: sorting.columnId === id,
                        })}
                        direction={id === sorting.columnId ? sorting.direction : 'ASC'}
                      />
                    )}
                  </th>
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
