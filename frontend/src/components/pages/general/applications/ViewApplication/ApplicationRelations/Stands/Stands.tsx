import React, { SyntheticEvent, useCallback } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { standsSelector } from '@/store/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { getStands } from '@/store/reducers/data';
import config from '@/config';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Stand } from '@/types';

interface Props {}

const Stands = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const applicationId = useParams().id as string;
  const navigate = useNavigate();

  const headBuilder = useCallback(
    () => (
      <tr>
        <th>Название</th>
        <th>Описание</th>
      </tr>
    ),
    [],
  );

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      navigate(config.routes.stands.view.replace(':id', entityId));
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
    return await dispatch(
      getStands({
        applicationId,
      }),
    );
  }, [applicationId, dispatch]);

  return (
    <EntitiesCatalogue
      headBuilder={headBuilder}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={standsSelector}
    />
  );
};

export default Stands;
