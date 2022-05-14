import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './GeneralLayout.module.scss';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';

interface Props {}

const GeneralLayout = ({}: Props): JSX.Element => {
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
