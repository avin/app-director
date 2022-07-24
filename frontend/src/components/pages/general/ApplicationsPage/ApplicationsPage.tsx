import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import styles from './ApplicationsPage.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '@/store/reducers/data';
import { applicationsSelector } from '@/store/selectors';
import { HTMLTable } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

interface Props {}

const ApplicationsPage = ({}: Props) => {
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
      navigate(`${config.routes.applications}/${applicationId}`);
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
      <HTMLTable striped bordered interactive className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Stands</th>
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

export default ApplicationsPage;
