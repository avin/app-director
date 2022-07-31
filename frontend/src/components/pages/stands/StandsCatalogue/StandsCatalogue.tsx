import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { standsSelector } from '@/store/selectors';
import { Button, Intent } from '@blueprintjs/core';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Stand } from '@/types';
import { getStands } from '@/store/reducers/stands';

interface Props {}

const StandsCatalogue = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();

  const headColumns = useMemo(() => {
    return [
      { id: 'title', label: 'Название' },
      { id: 'description', label: 'Описание' },
    ];
  }, []);

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      navigate(generatePath(config.routes.stands.view, { id: entityId }));
    },
    [navigate],
  );

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Stand>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        <td>{entity.title}</td>
        <td>{entity.description}</td>
      </tr>
    ),
    [handleClickRow],
  );

  const getEntities = useCallback(async () => {
    return dispatch(getStands());
  }, [dispatch]);

  return (
    <div>
      <ViewHeader
        title="Стенды"
        controls={
          <Link to="/stands/create" tabIndex={-1}>
            <Button intent={Intent.NONE} icon="plus">
              Добавить
            </Button>
          </Link>
        }
      />
      <EntitiesCatalogue
        headColumns={headColumns}
        rowBuilder={rowBuilder}
        getEntities={getEntities}
        entitiesSelector={standsSelector}
      />
    </div>
  );
};

export default StandsCatalogue;
