import React, { useEffect, useState } from 'react';
import styles from './ApplicationsPage.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '@/store/reducers/data';
import { applicationsSelector } from '@/store/selectors';

interface Props {}

const ApplicationsPage = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [isDataReady, setIsDataReady] = useState(false);
  const [isDataFetchFailed, setIsDataFetchFailed] = useState(false);
  const applications = useSelector(applicationsSelector);

  useEffect(() => {
    void (async () => {
      try {
        await dispatch(getApplications());
        setIsDataReady(true);
      } catch (error) {
        setIsDataFetchFailed(true);
      }
    })();
  }, [dispatch]);

  if (!isDataReady) {
    return <div>loading...</div>;
  }

  if (isDataFetchFailed) {
    return <div>fetch failed</div>;
  }

  if (!applications) {
    return <div>no applications array!</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr>
              <td>{application.title}</td>
              <td>{application.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsPage;
