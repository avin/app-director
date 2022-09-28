import React from 'react';
import config from '@/config';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import ApplicationsCatalogue from '@/components/entities/application/ApplicationsCatalogue/ApplicationsCatalogue';

interface Props {}

const ApplicationCategoryApplications = ({}: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();

  return (
    <ApplicationsCatalogue
      viewHeaderProps={{
        title: `Приложения категории [${applicationCategory.title}]`,
      }}
      addEntityRoute={`${config.routes.stands.create}?standCategoryId=${applicationCategory.id}`}
      getEntitiesFilter={{
        applicationCategoryId: applicationCategory.id,
      }}
    />
  );
};

export default ApplicationCategoryApplications;
