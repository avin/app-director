import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { organizationsSelector } from '@/store/selectors';
import { Button, Intent } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Organization } from '@/types';
import config from '@/config';
import { getOrganizations } from '@/store/reducers/organizations';

interface Props {
  columns: ('title' | 'description' | 'standsCount')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  title?: React.ReactNode;
}

const OrganizationsCatalogue = ({ title, columns, onClickRow }: Props) => {
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

  const getEntities = useCallback(async () => {
    return dispatch(getOrganizations());
  }, [dispatch]);

  return (
    <EntitiesCatalogue
      title="Организации"
      addEntityRoute={config.routes.organizations.create}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={organizationsSelector}
    />
  );
};

export default OrganizationsCatalogue;
