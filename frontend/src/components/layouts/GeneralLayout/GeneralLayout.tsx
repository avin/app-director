import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './GeneralLayout.module.scss';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/store/selectors';
import config from '@/config';

interface Props {}

const GeneralLayout = ({}: Props) => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(config.routes.logIn);
    }
  }, [navigate, user]);

  if (!user) {
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
