import React from 'react';
import OrganizationFetcher from '../OrganizationFetcher/OrganizationFetcher';
import { generatePath, Link } from 'react-router-dom';
import config from '@/config';

interface Props {
  organizationId: string;
  linkable?: boolean;
}

const OrganizationLabel = ({ organizationId, linkable }: Props) => {
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

        let content = <span>O: {entity.title}</span>;
        if (linkable) {
          content = <Link to={generatePath(config.routes.organizations.view, { id: organizationId })}>{content}</Link>;
        }

        return content;
      }}
    />
  );
};

export default OrganizationLabel;
