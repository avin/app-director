import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getApplications } from '@/store/reducers/applications';
import { applicationsSelector } from '@/store/selectors';
import EntitiesCatalogue, {
  HeadColumn,
  RowBuilderParams,
} from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Application } from '@/types';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import ApplicationCategoryLabel from '../../applicationCategory/ApplicationCategoryLabel/ApplicationCategoryLabel';
import { useHandleClickCatalogueRow } from '@/utils/hooks/useHandleClickCatalogueRow';

interface Props {
  columns: ('applicationCategory' | 'title' | 'description' | 'standsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
  addEntityRoute?: string;
  getEntitiesFilter?: any;
}

const ApplicationsCatalogue = ({
  viewHeaderProps,
  columns,
  onClickRow,
  addEntityRoute = config.routes.applications.create,
  getEntitiesFilter,
}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column): HeadColumn => {
      switch (column) {
        case 'applicationCategory':
          return { id: 'applicationCategory', label: 'Категория', sortable: false };
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

  const handleClickRow = useHandleClickCatalogueRow(config.routes.applications.view, onClickRow);

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Application>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        {columns.map((column) => {
          switch (column) {
            case 'applicationCategory':
              return (
                <td key="applicationCategory">
                  <ApplicationCategoryLabel applicationCategoryId={entity.applicationCategoryId} />
                </td>
              );
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
        getApplications(
          {
            ...getEntitiesFilter,
            ...filter,
          },
          (['applicationCategory'] as const).filter((i) => columns.includes(i)),
        ),
      );
    },
    [columns, dispatch, getEntitiesFilter],
  );

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Приложения',
        icon: config.defaultIcons.application,
        ...viewHeaderProps,
      }}
      addEntityRoute={addEntityRoute}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={applicationsSelector}
      defaultSortingColumnId="title"
    />
  );
};

export default ApplicationsCatalogue;
