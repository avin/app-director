import React from 'react';
import ApplicationFetcher from '@/components/common/ApplicationFetcher/ApplicationFetcher';

interface Props {
  applicationId: string;
}

const ApplicationLabel = ({ applicationId }: Props) => {
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
        return <span>ATC: {entity.title}</span>;
      }}
    />
  );
};

export default ApplicationLabel;
