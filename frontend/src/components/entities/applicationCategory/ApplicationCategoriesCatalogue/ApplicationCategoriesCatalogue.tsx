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
}

const ApplicationCategoryCategoriesCatalogue = ({ viewHeaderProps, columns, onClickRow }: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column) => {
      switch (column) {
        case 'title':
          return { id: 'title', label: 'Название' };
        case 'description':
          return { id: 'description', label: 'Описание' };
        case 'applicationsCount':
          return { id: 'applicationsCount', label: 'Приложения' };
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

  const getEntities = useCallback(async () => {
    return dispatch(getApplicationCategories());
  }, [dispatch]);

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Категории приложений',
        icon: config.defaultIcons.applicationCategory,
        ...viewHeaderProps,
      }}
      addEntityRoute={config.routes.applicationCategories.create}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={applicationCategoriesSelector}
    />
  );
};

export default ApplicationCategoryCategoriesCatalogue;
