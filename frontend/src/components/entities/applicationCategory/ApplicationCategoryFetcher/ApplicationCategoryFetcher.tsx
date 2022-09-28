import React, { ReactNode } from 'react';
import { applicationCategoryByIdSelector } from '@/store/selectors';
import { getApplicationCategory } from '@/store/reducers/applicationCategories';
import EntityFetcher, {
  EntityFetcherRenderParams,
} from '@/components/common/EntityFetcher/EntityFetcher';
import { ApplicationCategory } from '@/types';

interface Props {
  applicationCategoryId: string;
  render: (params: EntityFetcherRenderParams<ApplicationCategory>) => ReactNode;
}

const ApplicationCategoryCategoryFetcher = ({
  applicationCategoryId,
  render,
}: Props) => {
  return (
    <EntityFetcher
      entityId={applicationCategoryId}
      entityByIdSelector={applicationCategoryByIdSelector}
      entityGetter={getApplicationCategory}
      render={render}
    />
  );
};

export default ApplicationCategoryCategoryFetcher;
