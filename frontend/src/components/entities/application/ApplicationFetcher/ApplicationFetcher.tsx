import React, { ReactNode } from 'react';
import { applicationByIdSelector } from '@/store/selectors';
import { getApplication } from '@/store/reducers/applications';
import EntityFetcher, { EntityFetcherRenderParams } from '@/components/common/EntityFetcher/EntityFetcher';
import { Application } from '@/types';

interface Props {
  applicationId: string;
  render: (params: EntityFetcherRenderParams<Application>) => ReactNode;
}

const ApplicationFetcher = ({ applicationId, render }: Props) => {
  return (
    <EntityFetcher
      entityId={applicationId}
      entityByIdSelector={applicationByIdSelector}
      entityGetter={getApplication}
      render={render}
    />
  );
};

export default ApplicationFetcher;
