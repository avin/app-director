import React from 'react';
import { applicationByIdSelector } from '@/store/selectors';
import { getApplication } from '@/store/reducers/applications';
import EntityFetcher from '@/components/common/EntityFetcher/EntityFetcher';

interface Props {}

const ApplicationFetcher = ({}: Props) => {
  return <EntityFetcher entityByIdSelector={applicationByIdSelector} entityGetter={getApplication} />;
};

export default ApplicationFetcher;
