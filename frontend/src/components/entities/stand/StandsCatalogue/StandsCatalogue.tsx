import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { standsSelector } from '@/store/selectors';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue, {
  RowBuilderParams,
} from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Stand } from '@/types';
import config from '@/config';
import { getStands } from '@/store/reducers/stands';
import StandCategoryLabel from '@/components/entities/standCategory/StandCategoryLabel/StandCategoryLabel';
import ApplicationLabel from '@/components/entities/application/ApplicationLabel/ApplicationLabel';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';

interface Props {
  columns: (
    | 'standCategory'
    | 'title'
    | 'description'
    | 'application'
    | 'organization'
  )[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  addEntityRoute?: string;
  getEntitiesFilter?: any;
}

const StandsCatalogue = ({
  viewHeaderProps,
  columns,
  onClickRow,
  addEntityRoute = config.routes.stands.create,
  getEntitiesFilter,
}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column) => {
      switch (column) {
        case 'standCategory':
          return { id: 'standCategory', label: 'Категория', sortable: true };
        case 'title':
          return { id: 'title', label: 'Название', sortable: true };
        case 'description':
          return { id: 'description', label: 'Описание', sortable: true };
        case 'application':
          return { id: 'application', label: 'Приложение', sortable: true };
        case 'organization':
          return { id: 'organization', label: 'Организация', sortable: true };
        default:
          throw new Error(`unknown column`);
      }
    });
  }, [columns]);

  const handleClickRow = useHandleClickCatalogueRow(
    config.routes.stands.view,
    onClickRow,
  );

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Stand>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        {columns.map((column) => {
          switch (column) {
            case 'standCategory':
              return (
                <td key="standCategory">
                  <StandCategoryLabel
                    standCategoryId={entity.standCategoryId}
                  />
                </td>
              );
            case 'title':
              return <td key="title">{entity.title}</td>;
            case 'description':
              return <td key="description">{entity.description}</td>;
            case 'application':
              return (
                <td key="application">
                  <ApplicationLabel applicationId={entity.applicationId} />
                </td>
              );
            case 'organization':
              return (
                <td key="organization">
                  {entity.organizationId && (
                    <OrganizationLabel organizationId={entity.organizationId} />
                  )}
                </td>
              );
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
        getStands(
          {
            ...getEntitiesFilter,
            ...filter,
          },
          (['organization', 'application', 'standCategory'] as const).filter(
            (i) => columns.includes(i),
          ),
        ),
      );
    },
    [columns, dispatch, getEntitiesFilter],
  );

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Стенды',
        icon: config.defaultIcons.stand,
        ...viewHeaderProps,
      }}
      addEntityRoute={addEntityRoute}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={standsSelector}
      defaultSortingColumnId="title"
    />
  );
};

export default StandsCatalogue;
