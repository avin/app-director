import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { standsSelector } from '@/store/selectors';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { getStands } from '@/store/reducers/stands';
import config from '@/config';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Stand } from '@/types';

interface Props {}

const ApplicationCategoryApplications = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const applicationCategoryId = useParams().id as string;
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
    return dispatch(
      getStands({
        applicationCategoryId,
      }),
    );
  }, [applicationCategoryId, dispatch]);

  return (
    <EntitiesCatalogue
      addEntityRoute={`${config.routes.stands.create}?applicationCategoryId=${applicationCategoryId}`}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={standsSelector}
    />
  );
};

export default ApplicationCategoryApplications;
