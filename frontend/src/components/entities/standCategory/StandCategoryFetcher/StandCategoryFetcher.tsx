import React, { ReactNode } from 'react';
import { standCategoryByIdSelector } from '@/store/selectors';
import { getStandCategory } from '@/store/reducers/standCategories';
import EntityFetcher, { EntityFetcherRenderParams } from '@/components/common/EntityFetcher/EntityFetcher';
import { StandCategory } from '@/types';

interface Props {
  standCategoryId: string;
  render: (params: EntityFetcherRenderParams<StandCategory>) => ReactNode;
}

const StandCategoryCategoryFetcher = ({ standCategoryId, render }: Props) => {
  return (
    <EntityFetcher
      entityId={standCategoryId}
      entityByIdSelector={standCategoryByIdSelector}
      entityGetter={getStandCategory}
      render={render}
    />
  );
};

export default StandCategoryCategoryFetcher;
