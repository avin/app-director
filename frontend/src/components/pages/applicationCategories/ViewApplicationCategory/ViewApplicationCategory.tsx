import React from 'react';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import ViewEntity from '@/components/common/ViewEntity/ViewEntity';
import ApplicationCategoryRelations from './ApplicationCategoryRelations/ApplicationCategoryRelations';

interface Props {}

const ViewApplicationCategory = ({}: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();

  return (
    <ViewEntity
      entity={applicationCategory}
      entityType="applicationCategory"
      additionalContent={<ApplicationCategoryRelations />}
    />
  );
};

export default ViewApplicationCategory;
