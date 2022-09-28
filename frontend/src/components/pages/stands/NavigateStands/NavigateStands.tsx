import React from 'react';
import StandsCatalogue from '@/components/entities/stand/StandsCatalogue/StandsCatalogue';

interface Props {}

const NavigateStands = ({}: Props) => {
  return (
    <StandsCatalogue
      columns={[
        'standCategory',
        'title',
        'description',
        'application',
        'organization',
      ]}
    />
  );
};

export default NavigateStands;
