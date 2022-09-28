import React from 'react';
import { useStandCategoryByUrlParams } from '@/utils/hooks/useStandCategoryByUrlParams';
import { Form } from '@/constants/form';
import { useEntityFormDefaultValues } from '@/utils/hooks/useEntityFormDefaultValues';
import config from '@/config';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';

interface Props {
  onSubmit: (data: unknown) => Promise<void> | void;
}

const StandCategoryEditForm = ({ onSubmit }: Props) => {
  const standCategory = useStandCategoryByUrlParams();
  const fields = config.entities.standCategory.fields;

  const defaultValues = useEntityFormDefaultValues(standCategory, fields);

  return (
    <EntityEditForm
      name={Form.EditApplication}
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
};

export default StandCategoryEditForm;
