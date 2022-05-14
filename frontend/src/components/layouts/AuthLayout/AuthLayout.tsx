import { Card, Elevation } from '@blueprintjs/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

interface Props {}

const AuthLayout = ({}: Props): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Card elevation={Elevation.TWO} className={styles.content}>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
