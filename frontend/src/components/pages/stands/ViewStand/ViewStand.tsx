import React from 'react';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import ViewEntity from '@/components/common/ViewEntity/ViewEntity';

interface Props {}

const ViewStand = ({}: Props) => {
  const stand = useStandByUrlParams();

  return <ViewEntity entity={stand} entityType="stand" />;
};

export default ViewStand;
