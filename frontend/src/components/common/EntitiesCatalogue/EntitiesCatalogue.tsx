import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'clsx';
import styles from './EntitiesCatalogue.module.scss';
import { Button, HTMLTable, Intent, Spinner } from '@blueprintjs/core';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import FitPage from '../FitPage/FitPage';
import SortIndicator from '@/components/common/EntitiesCatalogue/SortIndicator/SortIndicator';
import { SortingDirection } from '@/types';
import Search from '@/components/common/EntitiesCatalogue/Search/Search';
import queryString from 'query-string';
import Mark from 'mark.js';
import { usePrevious } from '@/utils/hooks/usePrevious';
import config from '@/config';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';
import { getApplications } from '@/store/reducers/applications';
import ApplicationCategoryLabel from '@/components/entities/applicationCategory/ApplicationCategoryLabel/ApplicationCategoryLabel';
import { get } from 'lodash-es';
import ApplicationLabel from '@/components/entities/application/ApplicationLabel/ApplicationLabel';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';
import StandCategoryLabel from '@/components/entities/standCategory/StandCategoryLabel/StandCategoryLabel';
import {
  applicationCategoriesSelector,
  applicationsSelector,
  organizationsSelector,
  standCategoriesSelector,
  standsSelector,
} from '@/store/selectors';
import { pluralize } from '@/utils/strings';
import { getApplicationCategories } from '@/store/reducers/applicationCategories';
import { getOrganizations } from '@/store/reducers/organizations';
import { getStandCategories } from '@/store/reducers/standCategories';
import { getStands } from '@/store/reducers/stands';

interface Props {
  entityType: string;
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  defaultSortingDirection?: SortingDirection;
  getEntitiesFilter?: any;
  addEntityRoute?: string;
}

const EntitiesCatalogue = ({
  entityType,
  onClickRow,
  viewHeaderProps,
  defaultSortingDirection = 'ASC',
  getEntitiesFilter,
  addEntityRoute,
}: Props) => {
  const catalogueColumns = config.entities[entityType].catalogueColumns;

  if (!catalogueColumns) {
    throw new Error(`catalogueColumns not defined for ${entityType}`);
  }

  const entitiesSelector = useMemo(() => {
    switch (entityType) {
      case 'application':
        return applicationsSelector;
      case 'applicationCategory':
        return applicationCategoriesSelector;
      case 'organization':
        return organizationsSelector;
      case 'standCategory':
        return standCategoriesSelector;
      case 'stand':
        return standsSelector;
      default:
        throw new Error(`no entitiesSelector for ${entityType}`);
    }
  }, [entityType]);

  const dispatch: AppThunkDispatch = useDispatch();
  const [isDataFetchFailed, setIsDataFetchFailed] = useState(false);
  const entities = useSelector(entitiesSelector);
  const tableContainerElRef = useRef<HTMLDivElement>(null);
  const markInstanceRef = useRef<Mark | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [entitiesIds, setEntitiesIds] = useState<string[]>([]);
  const [entitiesCount, setEntitiesCount] = useState<null | number>(null);
  const [sorting, setSorting] = useState<{
    columnId: string | undefined;
    direction: SortingDirection;
  }>({
    columnId: catalogueColumns[0]?.id,
    direction: defaultSortingDirection,
  });
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || '',
  );
  const prevEntitiesIds = usePrevious(entitiesIds);

  // Highlight search substrings
  useEffect(() => {
    if (prevEntitiesIds !== entitiesIds) {
      setTimeout(() => {
        if (!tableContainerElRef.current) {
          return;
        }
        markInstanceRef.current =
          markInstanceRef.current || new Mark(tableContainerElRef.current);
        markInstanceRef.current.unmark({
          done: () => {
            if (markInstanceRef.current && searchValue) {
              markInstanceRef.current.mark(searchValue);
            }
          },
        });
      });
    }
  }, [entitiesIds, prevEntitiesIds, searchValue]);

  // Set search string as query-param in URL
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    parsed.search = searchValue;
    const queryResult = queryString.stringify(parsed, {
      skipEmptyString: true,
    });
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${queryResult}`.replace(/\?$/, ''),
    );
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

  const getEntities = useCallback(
    async (filter: any) => {
      const getEntitiesFunc = (() => {
        switch (entityType) {
          case 'application':
            return getApplications;
          case 'applicationCategory':
            return getApplicationCategories;
          case 'organization':
            return getOrganizations;
          case 'standCategory':
            return getStandCategories;
          case 'stand':
            return getStands;
          default:
            throw new Error(`no getEntities function for ${entityType}'`);
        }
      })();

      const relations = catalogueColumns.reduce((acc, column) => {
        if (column.type === 'relation') {
          acc.push(column.relation.relationTo);
        }
        return acc;
      }, []);

      return dispatch(
        getEntitiesFunc(
          {
            ...getEntitiesFilter,
            ...filter,
          },
          relations,
        ),
      );
    },
    [catalogueColumns, dispatch, entityType, getEntitiesFilter],
  );

  useEffect(() => {
    void (async () => {
      try {
        let limit: number | undefined;
        if (tableContainerElRef.current) {
          limit =
            Math.floor(tableContainerElRef.current.clientHeight / 30) + 10;
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
    if (
      tableContainerEl.scrollTop + tableContainerEl.clientHeight >=
      tableContainerEl.scrollHeight - 200
    ) {
      void loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('resize', handleScrollTableContainer);
    return () => {
      window.removeEventListener('resize', handleScrollTableContainer);
    };
  }, [handleScrollTableContainer]);

  const handleClickTh = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
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
    },
    [],
  );

  const handleClickRow = useHandleClickCatalogueRow(
    config.routes[pluralize(entityType)].view,
    onClickRow,
  );

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

            <Link
              to={addEntityRoute || config.routes[pluralize(entityType)].create}
              tabIndex={-1}
            >
              <Button intent={Intent.PRIMARY} icon="plus">
                Добавить
              </Button>
            </Link>
          </>
        }
        icon={config.defaultIcons[entityType]}
        {...viewHeaderProps}
      />
      <FitPage minHeight={100}>
        <div
          className={styles.tableContainer}
          onScroll={handleScrollTableContainer}
          ref={tableContainerElRef}
        >
          <HTMLTable
            striped
            bordered
            interactive
            condensed
            className={styles.table}
          >
            <thead>
              <tr>
                {catalogueColumns.map(({ label, id, sortable }) => (
                  <th
                    key={id}
                    onClick={handleClickTh}
                    data-id={id}
                    data-sortable={String(sortable || false)}
                  >
                    {label}
                    {sortable && (
                      <SortIndicator
                        className={cn(styles.sortIndicator, {
                          [styles.active]: sorting.columnId === id,
                        })}
                        direction={
                          id === sorting.columnId ? sorting.direction : 'ASC'
                        }
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
                    <div className={styles.noItemsTdContent}>
                      Ничего не найдено
                    </div>
                  </td>
                </tr>
              )}

              {!!entitiesCount &&
                entitiesIds.map((id) => {
                  const entity = entities[id];

                  return (
                    <tr key={id} onClick={handleClickRow} data-id={id}>
                      {catalogueColumns.map((column) => {
                        const content = (() => {
                          switch (column.type) {
                            case 'text':
                              return get(entity, column.text.of);
                            case 'relation':
                              const relation = column.relation;
                              if (!relation) {
                                throw new Error('no relation object');
                              }

                              const relationId = get(
                                entity,
                                column.id,
                              ) as string;

                              if (!relationId) {
                                return null;
                              }

                              switch (relation.relationTo) {
                                case 'application':
                                  return (
                                    <ApplicationLabel
                                      applicationId={relationId}
                                      linkable
                                    />
                                  );
                                case 'organization':
                                  return (
                                    <OrganizationLabel
                                      organizationId={relationId}
                                      linkable
                                    />
                                  );
                                case 'applicationCategory':
                                  return (
                                    <ApplicationCategoryLabel
                                      applicationCategoryId={relationId}
                                      linkable
                                    />
                                  );
                                case 'standCategory':
                                  return (
                                    <StandCategoryLabel
                                      standCategoryId={relationId}
                                      linkable
                                    />
                                  );
                                default:
                                  throw new Error('unknown relationTo');
                              }
                            case 'count':
                              return entity[column.count.of].length;
                            default:
                              throw new Error(`unknown column type`);
                          }
                        })();
                        return <td key={column.id}>{content}</td>;
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </HTMLTable>
        </div>
      </FitPage>
    </div>
  );
};

export default EntitiesCatalogue;
