import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import OrganizationFetcher from '@/components/common/OrganizationFetcher/OrganizationFetcher';

interface Props {}

const OrganizationFetcherLayout = ({}: Props) => {
  const organizationId = useParams().id as string;

  return (
    <OrganizationFetcher
      organizationId={organizationId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <div>Загрузка...</div>;
        }
        if (!entity) {
          return <div>Organization not found</div>;
        }
        return <Outlet />;
      }}
    />
  );
};

export default OrganizationFetcherLayout;
