import React from 'react';
import config from '@/config';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import ApplicationsCatalogue from '@/components/entities/application/ApplicationsCatalogue/ApplicationsCatalogue';
import { defaultValuesQueryParam } from '@/utils/strings';

interface Props {}

const ApplicationCategoryApplications = ({}: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();

  return (
    <ApplicationsCatalogue
      viewHeaderProps={{
        title: `Приложения категории [${applicationCategory.title}]`,
      }}
      addEntityRoute={`${
        config.routes.applications.create
      }?${defaultValuesQueryParam({
        applicationCategoryId: applicationCategory.id,
      })}`}
      getEntitiesFilter={{
        applicationCategoryId: applicationCategory.id,
      }}
    />
  );
};

export default ApplicationCategoryApplications;
