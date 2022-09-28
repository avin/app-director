import React from 'react';
import EntitiesCatalogue from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';

interface Props
  extends Omit<$ElementProps<typeof EntitiesCatalogue>, 'entityType'> {
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const ApplicationCategoriesCatalogue = ({
  viewHeaderProps,
  ...props
}: Props) => {
  return (
    <EntitiesCatalogue
      entityType="applicationCategory"
      viewHeaderProps={{
        title: 'Категории приложений',
        ...viewHeaderProps,
      }}
      {...props}
    />
  );
};

export default ApplicationCategoriesCatalogue;
