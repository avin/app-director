import React from 'react';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';

interface Props
  extends Omit<$ElementProps<typeof EntitiesCatalogue>, 'entityType'> {
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const StandsCatalogue = ({ viewHeaderProps, ...props }: Props) => {
  return (
    <EntitiesCatalogue
      entityType="stand"
      viewHeaderProps={{
        title: 'Стенды',
        ...viewHeaderProps,
      }}
      {...props}
    />
  );
};

export default StandsCatalogue;
