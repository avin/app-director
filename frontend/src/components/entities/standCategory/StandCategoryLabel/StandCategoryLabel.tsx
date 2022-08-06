import React from 'react';
import StandCategoryFetcher from '@/components/entities/standCategory/StandCategoryFetcher/StandCategoryFetcher';
import { generatePath, Link } from 'react-router-dom';
import config from '@/config';

interface Props {
  standCategoryId: string;
  linkable?: boolean;
}

const StandCategoryCategoryLabel = ({ standCategoryId, linkable }: Props) => {
  return (
    <StandCategoryFetcher
      standCategoryId={standCategoryId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <span>Loading...</span>;
        }

        if (!entity) {
          return <span>NOT_EXISTING_APPLICATION</span>;
        }

        let content = <span>ATC: {entity.title}</span>;
        if (linkable) {
          content = (
            <Link to={generatePath(config.routes.standCategories.view, { id: standCategoryId })}>{content}</Link>
          );
        }

        return content;
      }}
    />
  );
};

export default StandCategoryCategoryLabel;
