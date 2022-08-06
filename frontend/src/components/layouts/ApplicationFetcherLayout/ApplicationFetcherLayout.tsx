import React from 'react';
import ApplicationFetcher from '@/components/entities/application/ApplicationFetcher/ApplicationFetcher';
import { Outlet, useParams } from 'react-router-dom';

interface Props {}

const ApplicationFetcherLayout = ({}: Props) => {
  const applicationId = useParams().id as string;

  return (
    <ApplicationFetcher
      applicationId={applicationId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <div>Загрузка...</div>;
        }
        if (!entity) {
          return <div>Приложение не найдено</div>;
        }
        return <Outlet />;
      }}
    />
  );
};

export default ApplicationFetcherLayout;
