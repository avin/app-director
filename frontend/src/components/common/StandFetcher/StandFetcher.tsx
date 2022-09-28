import React, { ReactNode } from 'react';
import { standByIdSelector } from '@/store/selectors';
import EntityFetcher, {
  EntityFetcherRenderParams,
} from '@/components/common/EntityFetcher/EntityFetcher';
import { Stand } from '@/types';
import { getStand } from '@/store/reducers/stands';

interface Props {
  standId: string;
  render: (params: EntityFetcherRenderParams<Stand>) => ReactNode;
}

const StandFetcher = ({ render, standId }: Props) => {
  return (
    <EntityFetcher
      entityId={standId}
      entityByIdSelector={standByIdSelector}
      entityGetter={getStand}
      render={render}
    />
  );
};

export default StandFetcher;
