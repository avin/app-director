import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import ApplicationCategoriesCatalogue from '@/components/entities/applicationCategory/ApplicationCategoriesCatalogue/ApplicationCategoriesCatalogue';

interface Props {}

const NavigateApplicationCategories = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (applicationCategoryId: string) => {
      navigate(
        generatePath(config.routes.applicationCategories.view, {
          id: applicationCategoryId,
        }),
      );
    },
    [navigate],
  );

  return (
    <ApplicationCategoriesCatalogue
      columns={['title', 'description', 'applicationsCount']}
      onClickRow={handleClickRow}
    />
  );
};

export default NavigateApplicationCategories;
