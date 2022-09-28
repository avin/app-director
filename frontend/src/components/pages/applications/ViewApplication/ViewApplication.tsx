import React from 'react';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import ApplicationRelations from './ApplicationRelations/ApplicationRelations';
import ViewEntity from '@/components/common/ViewEntity/ViewEntity';

interface Props {}

const ViewApplication = ({}: Props) => {
  const application = useApplicationByUrlParams();

  return (
    <ViewEntity
      entity={application}
      entityType="application"
      additionalContent={<ApplicationRelations />}
    />
  );
};

export default ViewApplication;
