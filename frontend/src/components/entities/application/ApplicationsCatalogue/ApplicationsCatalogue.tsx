import React from 'react';
import EntitiesCatalogue from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';

interface Props
  extends Omit<$ElementProps<typeof EntitiesCatalogue>, 'entityType'> {
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const ApplicationsCatalogue = ({ viewHeaderProps, ...props }: Props) => {
  return (
    <EntitiesCatalogue
      entityType="application"
      viewHeaderProps={{
        title: 'Приложения',
        icon: config.defaultIcons.application,
        ...viewHeaderProps,
      }}
      {...props}
    />
  );
};

export default ApplicationsCatalogue;
