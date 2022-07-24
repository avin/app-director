import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './GeneralLayout.module.scss';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '@/store/selectors';
import config from '@/config';
import { AppThunkDispatch } from '@/store/configureStore';
import { setRedirectLinkAfterLogIn } from '@/store/reducers/ui';

interface Props {}

const GeneralLayout = ({}: Props) => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(setRedirectLinkAfterLogIn(location.pathname));
      navigate(config.routes.logIn);
    }
  }, [dispatch, location.pathname, navigate, user]);

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
