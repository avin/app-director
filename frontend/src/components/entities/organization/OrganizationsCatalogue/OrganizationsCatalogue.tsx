import React from 'react';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';

interface Props
  extends Omit<$ElementProps<typeof EntitiesCatalogue>, 'entityType'> {
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const OrganizationsCatalogue = ({ viewHeaderProps, ...props }: Props) => {
  return (
    <EntitiesCatalogue
      entityType="organization"
      viewHeaderProps={{
        title: 'Организации',
        ...viewHeaderProps,
      }}
      {...props}
    />
  );
};

export default OrganizationsCatalogue;
