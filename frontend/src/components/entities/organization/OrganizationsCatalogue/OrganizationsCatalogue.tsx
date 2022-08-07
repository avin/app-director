import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { organizationsSelector } from '@/store/selectors';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Organization } from '@/types';
import config from '@/config';
import { getOrganizations } from '@/store/reducers/organizations';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';

interface Props {
  columns: ('title' | 'description' | 'standsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  addEntityRoute?: string;
  getEntitiesFilter?: any;
}

const OrganizationsCatalogue = ({
  viewHeaderProps,
  columns,
  onClickRow,
  addEntityRoute = config.routes.organizations.create,
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
        case 'standsCount':
          return { id: 'standsCount', label: 'Стенды', sortable: false };
        default:
          throw new Error(`unknown column`);
      }
    });
  }, [columns]);

  const handleClickRow = useHandleClickCatalogueRow(config.routes.organizations.view, onClickRow);

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Organization>) => (
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

  const getEntities = useCallback(
    async (filter: any) => {
      return dispatch(
        getOrganizations({
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
        title: 'Организации',
        icon: config.defaultIcons.organization,
        ...viewHeaderProps,
      }}
      addEntityRoute={addEntityRoute}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={organizationsSelector}
      defaultSortingColumnId="title"
    />
  );
};

export default OrganizationsCatalogue;
