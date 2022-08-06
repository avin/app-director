import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getStandCategories } from '@/store/reducers/standCategories';
import { standCategoriesSelector } from '@/store/selectors';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { StandCategory } from '@/types';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';

interface Props {
  columns: ('title' | 'description' | 'standsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const StandCategoryCategoriesCatalogue = ({ viewHeaderProps, columns, onClickRow }: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column) => {
      switch (column) {
        case 'title':
          return { id: 'title', label: 'Название' };
        case 'description':
          return { id: 'description', label: 'Описание' };
        case 'standsCount':
          return { id: 'standsCount', label: 'Стенды' };
        default:
          throw new Error(`unknown column`);
      }
    });
  }, [columns]);

  const handleClickRow = useHandleClickCatalogueRow(config.routes.standCategories.view, onClickRow);

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<StandCategory>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        {columns.map((column) => {
          switch (column) {
            case 'title':
              return <td key="title">{entity.title}</td>;
            case 'description':
              return <td key="description">{entity.description}</td>;
            case 'standsCount':
              return <td key="standsCount">{entity.stands.length}</td>;
            default:
              throw new Error(`unknown column`);
          }
        })}
      </tr>
    ),
    [columns, handleClickRow],
  );

  const getEntities = useCallback(async () => {
    return dispatch(getStandCategories());
  }, [dispatch]);

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Категории стендов',
        icon: config.defaultIcons.standCategory,
        ...viewHeaderProps,
      }}
      addEntityRoute={config.routes.standCategories.create}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={standCategoriesSelector}
    />
  );
};

export default StandCategoryCategoriesCatalogue;
