import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getApplicationCategories } from '@/store/reducers/applicationCategories';
import { applicationCategoriesSelector } from '@/store/selectors';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { ApplicationCategory } from '@/types';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';

interface Props {
  columns: ('title' | 'description' | 'applicationsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  addEntityRoute?: string;
  getEntitiesFilter?: any;
}

const ApplicationCategoryCategoriesCatalogue = ({
  viewHeaderProps,
  columns,
  onClickRow,
  addEntityRoute = config.routes.applicationCategories.create,
  getEntitiesFilter,
}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column) => {
      switch (column) {
        case 'title':
          return { id: 'title', label: 'Название', sortable: true };
        case 'description':
          return { id: 'description', label: 'Описание', sortable: true };
        case 'applicationsCount':
          return { id: 'applicationsCount', label: 'Приложения', sortable: true };
        default:
          throw new Error(`unknown column`);
      }
    });
  }, [columns]);

  const handleClickRow = useHandleClickCatalogueRow(config.routes.applicationCategories.view, onClickRow);

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<ApplicationCategory>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        {columns.map((column) => {
          switch (column) {
            case 'title':
              return <td key="title">{entity.title}</td>;
            case 'description':
              return <td key="description">{entity.description}</td>;
            case 'applicationsCount':
              return <td key="standsCount">{entity.applications.length}</td>;
            default:
              throw new Error(`unknown column`);
          }
        })}
      </tr>
    ),
    [columns, handleClickRow],
  );

  const getEntities = useCallback(
    async (filter: any) => {
      return dispatch(
        getApplicationCategories({
          ...getEntitiesFilter,
          ...filter,
        }),
      );
    },
    [dispatch, getEntitiesFilter],
  );

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Категории приложений',
        icon: config.defaultIcons.applicationCategory,
        ...viewHeaderProps,
      }}
      addEntityRoute={addEntityRoute}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={applicationCategoriesSelector}
      defaultSortingColumnId="title"
    />
  );
};

export default ApplicationCategoryCategoriesCatalogue;
