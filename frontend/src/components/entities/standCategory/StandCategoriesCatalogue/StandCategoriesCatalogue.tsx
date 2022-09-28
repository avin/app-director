import React from 'react';
import EntitiesCatalogue from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';

interface Props
  extends Omit<$ElementProps<typeof EntitiesCatalogue>, 'entityType'> {
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const StandCategoryCategoriesCatalogue = ({
  viewHeaderProps,
  ...props
}: Props) => {
  return (
    <EntitiesCatalogue
      entityType="standCategory"
      viewHeaderProps={{
        title: 'Категории стендов',
        ...viewHeaderProps,
      }}
      {...props}
    />
  );
};

export default StandCategoryCategoriesCatalogue;
