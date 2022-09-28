import React from 'react';
import OrganizationRelations from './OrganizationRelations/OrganizationRelations';
import { useOrganizationByUrlParams } from '@/utils/hooks/useOrganizationByUrlParams';
import ViewEntity from '@/components/common/ViewEntity/ViewEntity';

interface Props {}

const ViewOrganization = ({}: Props) => {
  const organization = useOrganizationByUrlParams();

  return (
    <ViewEntity
      entity={organization}
      entityType="organization"
      additionalContent={<OrganizationRelations />}
    />
  );
};

export default ViewOrganization;
