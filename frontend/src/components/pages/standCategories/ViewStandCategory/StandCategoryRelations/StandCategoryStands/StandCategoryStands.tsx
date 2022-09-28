import React from 'react';
import config from '@/config';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';
import { useStandCategoryByUrlParams } from '@/utils/hooks/useStandCategoryByUrlParams';

interface Props {}

const StandCategoryStands = ({}: Props) => {
  const standCategory = useStandCategoryByUrlParams();

  return (
    <StandsCatalogue
      viewHeaderProps={{
        title: `Стенды категории [${standCategory.title}]`,
      }}
      columns={[
        'standCategory',
        'title',
        'description',
        'application',
        'organization',
      ]}
      addEntityRoute={`${config.routes.stands.create}?standCategoryId=${standCategory.id}`}
      getEntitiesFilter={{
        standCategoryId: standCategory.id,
      }}
    />
  );
};

export default StandCategoryStands;
