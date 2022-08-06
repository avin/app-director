import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import OrganizationsCatalogue from '@/components/entities/organization/OrganizationsCatalogue/OrganizationsCatalogue';

interface Props {}

const NavigateOrganizations = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (organizationId: string) => {
      navigate(generatePath(config.routes.organizations.view, { id: organizationId }));
    },
    [navigate],
  );

  return <OrganizationsCatalogue columns={['title', 'description', 'standsCount']} onClickRow={handleClickRow} />;
};

export default NavigateOrganizations;
