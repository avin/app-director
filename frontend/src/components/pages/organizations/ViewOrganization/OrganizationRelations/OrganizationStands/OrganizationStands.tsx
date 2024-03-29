import React from 'react';
import config from '@/config';
import { useOrganizationByUrlParams } from '@/utils/hooks/useOrganizationByUrlParams';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';
import { defaultValuesQueryParam } from '@/utils/strings';

interface Props {}

const OrganizationStands = ({}: Props) => {
  const organization = useOrganizationByUrlParams();

  return (
    <StandsCatalogue
      viewHeaderProps={{
        title: `Стенды организации [${organization.title}]`,
      }}
      addEntityRoute={`${config.routes.stands.create}?${defaultValuesQueryParam(
        { organizationId: organization.id },
      )}`}
      getEntitiesFilter={{
        organizationId: organization.id,
      }}
    />
  );
};

export default OrganizationStands;
