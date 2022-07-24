import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from './ApplicationFetcher.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { applicationByIdSelector } from '@/store/selectors';
import { AppThunkDispatch } from '@/store/configureStore';
import { getApplication } from '@/store/reducers/data';

interface Props {}

const ApplicationFetcher = ({}: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const applicationId = useParams().id as string;
  const application = useSelector((state: RootState) => applicationByIdSelector(state, applicationId));
  const [isApplicationFetched, setIsApplicationFetched] = useState(!!application);

  useEffect(() => {
    void (async () => {
      if (isApplicationFetched) {
        return;
      }
      try {
        await dispatch(getApplication(applicationId));
      } finally {
        setIsApplicationFetched(true);
      }
    })();
  }, [applicationId, dispatch, isApplicationFetched]);

  if (!isApplicationFetched) {
    return <div>Loading...</div>;
  }

  if (isApplicationFetched && !application) {
    return <div>Not found</div>;
  }

  return <Outlet />;
};

export default ApplicationFetcher;
