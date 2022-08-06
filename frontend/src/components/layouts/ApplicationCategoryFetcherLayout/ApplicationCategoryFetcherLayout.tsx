import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ApplicationCategoryFetcher from '@/components/entities/applicationCategory/ApplicationCategoryFetcher/ApplicationCategoryFetcher';

interface Props {}

const ApplicationCategoryFetcherLayout = ({}: Props) => {
  const applicationCategoryId = useParams().id as string;

  return (
    <ApplicationCategoryFetcher
      applicationCategoryId={applicationCategoryId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <div>Загрузка...</div>;
        }
        if (!entity) {
          return <div>Категория приложения не найдена</div>;
        }
        return <Outlet />;
      }}
    />
  );
};

export default ApplicationCategoryFetcherLayout;
