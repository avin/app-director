import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ApplicationFetcher.module.scss';

interface Props {}

const ApplicationFetcher = ({}: Props) => {
  const [isApplicationFetched, setIsApplicationFetched] = useState(false);

  return <Outlet />;
};

export default ApplicationFetcher;
