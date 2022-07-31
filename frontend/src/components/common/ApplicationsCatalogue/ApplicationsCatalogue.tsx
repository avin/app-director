import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getApplications } from '@/store/reducers/applications';
import { applicationsSelector } from '@/store/selectors';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Application } from '@/types';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';

interface Props {
  columns: ('title' | 'description' | 'standsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const ApplicationsCatalogue = ({ viewHeaderProps, columns, onClickRow }: Props) => {
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

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      if (onClickRow) {
        onClickRow(entityId, e);
      }
    },
    [onClickRow],
  );

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Application>) => (
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
    return dispatch(getApplications());
  }, [dispatch]);

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Приложения',
        icon: config.defaultIcons.application,
        ...viewHeaderProps,
      }}
      addEntityRoute={config.routes.applications.create}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={applicationsSelector}
    />
  );
};

export default ApplicationsCatalogue;
