import { addToNavigationLog } from '@/store/reducers/ui';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LogNavigation.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';

interface Props {}

const LogNavigation = ({}: Props) => {
  const location = useLocation();
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect(() => {
    dispatch(addToNavigationLog(location));
  }, [dispatch, location]);

  return null;
};

export default LogNavigation;
