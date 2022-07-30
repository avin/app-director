import React from 'react';
import { organizationByIdSelector } from '@/store/selectors';
import { getOrganization } from '@/store/reducers/organizations';
import EntityFetcher from '@/components/common/EntityFetcher/EntityFetcher';

interface Props {}

const OrganizationFetcher = ({}: Props) => {
  return <EntityFetcher entityByIdSelector={organizationByIdSelector} entityGetter={getOrganization} />;
};

export default OrganizationFetcher;
