import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '@/store/selectors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { refreshTokens } from '@/store/reducers/data';
import { setRedirectLinkAfterLogIn } from '@/store/reducers/ui';
import config from '@/config';

interface Props {}

const UserRequiredLayout = ({}: Props) => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const location = useLocation();
  const [isUserFetched, setIsUserFetched] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        if (!user) {
          await dispatch(refreshTokens());
        }
      } finally {
        setIsUserFetched(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user && isUserFetched) {
      dispatch(setRedirectLinkAfterLogIn(location.pathname));
      navigate(config.routes.logIn);
    }
  }, [dispatch, location.pathname, navigate, user, isUserFetched]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};

export default UserRequiredLayout;
