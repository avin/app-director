import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import StandCategoryFetcher from '@/components/entities/standCategory/StandCategoryFetcher/StandCategoryFetcher';

interface Props {}

const StandCategoryFetcherLayout = ({}: Props) => {
  const standCategoryId = useParams().id as string;

  return (
    <StandCategoryFetcher
      standCategoryId={standCategoryId}
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

export default StandCategoryFetcherLayout;
