import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './GeneralLayout.module.scss';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { getApplicationCategories } from '@/store/reducers/applicationCategories';
import { getStandCategories } from '@/store/reducers/standCategories';

interface Props {}

const GeneralLayout = ({}: Props) => {
  const [isBaseDataFetched, setIsBaseDataFetched] = useState(false);
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect(() => {
    void (async () => {
      try {
        // await Promise.all([dispatch(getApplicationCategories()), dispatch(getStandCategories())]);
      } finally {
        setIsBaseDataFetched(true);
      }
    })();
  }, [dispatch]);

  if (!isBaseDataFetched) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <div className={styles.navigationContainer}>
          <Navigation />
        </div>
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GeneralLayout;
