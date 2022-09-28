import React from 'react';
import ApplicationFetcher from '@/components/entities/application/ApplicationFetcher/ApplicationFetcher';
import { generatePath, Link } from 'react-router-dom';
import config from '@/config';

interface Props {
  applicationId: string;
  linkable?: boolean;
}

const ApplicationLabel = ({ applicationId, linkable }: Props) => {
  return (
    <ApplicationFetcher
      applicationId={applicationId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <span>Loading...</span>;
        }

        if (!entity) {
          return <span>NOT_EXISTING_APPLICATION</span>;
        }

        let content = <span>A: {entity.title}</span>;
        if (linkable) {
          content = (
            <Link
              to={generatePath(config.routes.applications.view, {
                id: applicationId,
              })}
            >
              {content}
            </Link>
          );
        }

        return content;
      }}
    />
  );
};

export default ApplicationLabel;
