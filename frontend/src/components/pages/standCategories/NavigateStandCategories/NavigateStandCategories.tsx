import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import StandCategoriesCatalogue from '@/components/entities/standCategory/StandCategoriesCatalogue/StandCategoriesCatalogue';

interface Props {}

const NavigateStandCategories = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (standCategoryId: string) => {
      navigate(generatePath(config.routes.standCategories.view, { id: standCategoryId }));
    },
    [navigate],
  );

  return <StandCategoriesCatalogue columns={['title', 'description', 'standsCount']} onClickRow={handleClickRow} />;
};

export default NavigateStandCategories;
