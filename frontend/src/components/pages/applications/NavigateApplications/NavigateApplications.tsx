import React, { useCallback } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import ApplicationsCatalogue from '@/components/common/ApplicationsCatalogue/ApplicationsCatalogue';

interface Props {}

const NavigateApplications = ({}: Props) => {
  const navigate = useNavigate();

  const handleClickRow = useCallback(
    (applicationId: string) => {
      navigate(generatePath(config.routes.applications.view, { id: applicationId }));
    },
    [navigate],
  );

  return (
    <>
      <PageHeader
        title="Приложения"
        controls={
          <Link to="/applications/create" tabIndex={-1}>
            <Button intent={Intent.NONE} icon="plus">
              Добавить
            </Button>
          </Link>
        }
      />
      <ApplicationsCatalogue
        title="Приложения"
        columns={['title', 'description', 'standsCount']}
        onClickRow={handleClickRow}
      />
    </>
  );
};

export default NavigateApplications;
