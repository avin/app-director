import React from 'react';
import config from '@/config';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { defaultValuesQueryParam } from '@/utils/strings';

interface Props {}

const ApplicationStands = ({}: Props) => {
  const application = useApplicationByUrlParams();

  return (
    <StandsCatalogue
      viewHeaderProps={{
        title: `Стенды приложения [${application.title}]`,
      }}
      addEntityRoute={`${config.routes.stands.create}?${defaultValuesQueryParam(
        { applicationId: application.id },
      )}`}
      getEntitiesFilter={{
        applicationId: application.id,
      }}
    />
  );
};

export default ApplicationStands;
