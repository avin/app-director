import React, { SyntheticEvent, useCallback } from 'react';
import styles from './ApplicationsCatalogue.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getApplications } from '@/store/reducers/data';
import { applicationsSelector } from '@/store/selectors';
import { Button, Intent } from '@blueprintjs/core';
import { Link, useNavigate } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Application } from '@/types';

interface Props {}

const ApplicationsCatalogue = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();

  const headBuilder = useCallback(
    () => (
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Стенды</th>
      </tr>
    ),
    [],
  );

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      navigate(config.routes.applications.view.replace(':id', entityId));
    },
    [navigate],
  );

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Application>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        <td>{entity.title}</td>
        <td>{entity.description}</td>
        <td>{entity.stands.length}</td>
      </tr>
    ),
    [handleClickRow],
  );

  const getEntities = useCallback(async () => {
    return await dispatch(getApplications());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Приложения"
        controls={
          <Link to="/applications/create" tabIndex={-1}>
            <Button intent={Intent.NONE} icon="plus">
              Добавить
            </Button>
          </Link>
        }
      />
      <EntitiesCatalogue
        headBuilder={headBuilder}
        rowBuilder={rowBuilder}
        getEntities={getEntities}
        entitiesSelector={applicationsSelector}
      />
    </div>
  );
};

export default ApplicationsCatalogue;
