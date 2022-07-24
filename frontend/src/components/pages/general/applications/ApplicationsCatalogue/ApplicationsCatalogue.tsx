import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import styles from './ApplicationsCatalogue.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '@/store/reducers/data';
import { applicationsSelector } from '@/store/selectors';
import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { useNavigate, Link } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';

interface Props {}

const ApplicationsCatalogue = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [isDataFetchFailed, setIsDataFetchFailed] = useState(false);
  const applications = useSelector(applicationsSelector);
  const navigate = useNavigate();

  const [applicationsIds, setApplicationsIds] = useState<string[]>([]);
  const [applicationsCount, setApplicationsCount] = useState<null | number>(null);

  useEffect(() => {
    void (async () => {
      try {
        const { ids, count } = await dispatch(getApplications());
        setApplicationsIds(ids);
        setApplicationsCount(count);
      } catch (error) {
        setIsDataFetchFailed(true);
      }
    })();
  }, [dispatch]);

  const handleClickApplicationRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const applicationId = e.currentTarget.dataset.id as string;
      navigate(config.routes.applications.view.replace(':id', applicationId));
    },
    [navigate],
  );

  if (isDataFetchFailed) {
    return <div>something wrong</div>;
  }

  if (applicationsCount === null) {
    return <div>loading...</div>;
  }

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

      <HTMLTable striped bordered interactive condensed className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Стенды</th>
          </tr>
        </thead>
        <tbody>
          {applicationsIds.map((id) => (
            <tr key={id} onClick={handleClickApplicationRow} data-id={id}>
              <td>{applications[id].title}</td>
              <td>{applications[id].description}</td>
              <td>{applications[id].stands.length}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};

export default ApplicationsCatalogue;
