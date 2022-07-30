import React from 'react';
import { standByIdSelector } from '@/store/selectors';
import { getStand } from '@/store/reducers/stands';
import EntityFetcher from '@/components/common/EntityFetcher/EntityFetcher';

interface Props {}

const StandFetcher = ({}: Props) => {
  return <EntityFetcher entityByIdSelector={standByIdSelector} entityGetter={getStand} />;
};

export default StandFetcher;
