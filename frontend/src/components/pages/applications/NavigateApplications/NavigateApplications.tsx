import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import ApplicationsCatalogue from '@/components/entities/application/ApplicationsCatalogue/ApplicationsCatalogue';

interface Props {}

const NavigateApplications = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (applicationId: string) => {
      navigate(generatePath(config.routes.applications.view, { id: applicationId }));
    },
    [navigate],
  );

  return <ApplicationsCatalogue columns={['title', 'description', 'standsCount']} onClickRow={handleClickRow} />;
};

export default NavigateApplications;
