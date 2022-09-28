import React from 'react';
import { useStandCategoryByUrlParams } from '@/utils/hooks/useStandCategoryByUrlParams';
import StandCategoryRelations from './StandCategoryRelations/StandCategoryRelations';
import ViewEntity from '@/components/common/ViewEntity/ViewEntity';

interface Props {}

const ViewStandCategory = ({}: Props) => {
  const standCategory = useStandCategoryByUrlParams();

  return (
    <ViewEntity
      entity={standCategory}
      entityType="standCategory"
      additionalContent={<StandCategoryRelations />}
    />
  );
};

export default ViewStandCategory;
