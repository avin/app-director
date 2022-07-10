import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import config from '@/config';

interface Props {}

const NotFoundPage = ({}: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(config.routes.monitoring);
  }, [navigate]);

  return null;
};

export default NotFoundPage;
