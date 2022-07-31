import React from 'react';
import OrganizationFetcher from '../OrganizationFetcher/OrganizationFetcher';

interface Props {
  organizationId: string;
}

const OrganizationLabel = ({ organizationId }: Props) => {
  return (
    <OrganizationFetcher
      organizationId={organizationId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <span>Loading...</span>;
        }
        if (!entity) {
          return <span>NOT_EXISTING_ORGANIZATION</span>;
        }
        return <span>ORG: {entity.title}</span>;
      }}
    />
  );
};

export default OrganizationLabel;
