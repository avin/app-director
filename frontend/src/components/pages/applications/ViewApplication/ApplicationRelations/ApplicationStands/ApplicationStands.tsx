import React from 'react';
import config from '@/config';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';

interface Props {}

const ApplicationStands = ({}: Props) => {
  const application = useApplicationByUrlParams();

  return (
    <StandsCatalogue
      viewHeaderProps={{
        title: `Стенды приложения [${application.title}]`,
      }}
      columns={['standCategory', 'title', 'description', 'organization']}
      addEntityRoute={`${config.routes.stands.create}?standCategoryId=${application.id}`}
      getEntitiesFilter={{
        applicationId: application.id,
      }}
    />
  );
};

export default ApplicationStands;
