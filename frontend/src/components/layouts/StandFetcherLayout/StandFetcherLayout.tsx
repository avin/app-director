import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import StandFetcher from '@/components/common/StandFetcher/StandFetcher';

interface Props {}

const StandFetcherLayout = ({}: Props) => {
  const standId = useParams().id as string;

  return (
    <StandFetcher
      standId={standId}
      render={({ isLoading, entity }) => {
        if (isLoading) {
          return <div>Загрузка...</div>;
        }
        if (!entity) {
          return <div>Stand not found</div>;
        }
        return <Outlet />;
      }}
    />
  );
};

export default StandFetcherLayout;
