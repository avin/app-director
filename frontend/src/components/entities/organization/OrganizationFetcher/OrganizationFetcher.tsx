import React, { ReactNode } from 'react';
import { organizationByIdSelector } from '@/store/selectors';
import EntityFetcher, {
  EntityFetcherRenderParams,
} from '@/components/common/EntityFetcher/EntityFetcher';
import { Organization } from '@/types';
import { getOrganization } from '@/store/reducers/organizations';

interface Props {
  organizationId: string;
  render: (params: EntityFetcherRenderParams<Organization>) => ReactNode;
}

const OrganizationFetcher = ({ render, organizationId }: Props) => {
  return (
    <EntityFetcher
      entityId={organizationId}
      entityByIdSelector={organizationByIdSelector}
      entityGetter={getOrganization}
      render={render}
    />
  );
};

export default OrganizationFetcher;
