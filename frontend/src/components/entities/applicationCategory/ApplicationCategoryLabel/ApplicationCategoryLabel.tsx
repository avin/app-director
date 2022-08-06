import React from 'react';
import ApplicationCategoryFetcher from '@/components/entities/applicationCategory/ApplicationCategoryFetcher/ApplicationCategoryFetcher';
import { generatePath, Link } from 'react-router-dom';
import config from '@/config';

interface Props {
  applicationCategoryId: string;
  linkable?: boolean;
}

const ApplicationCategoryCategoryLabel = ({ applicationCategoryId, linkable }: Props) => {
  return (
    <ApplicationCategoryFetcher
      applicationCategoryId={applicationCategoryId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <span>Loading...</span>;
        }

        if (!entity) {
          return <span>NOT_EXISTING_APPLICATION</span>;
        }

        let content = <span>AC: {entity.title}</span>;
        if (linkable) {
          content = (
            <Link to={generatePath(config.routes.applicationCategories.view, { id: applicationCategoryId })}>
              {content}
            </Link>
          );
        }

        return content;
      }}
    />
  );
};

export default ApplicationCategoryCategoryLabel;
