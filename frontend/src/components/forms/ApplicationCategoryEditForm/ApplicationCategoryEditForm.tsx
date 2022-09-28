import React from 'react';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import { Form } from '@/constants/form';
import { useEntityFormDefaultValues } from '@/utils/hooks/useEntityFormDefaultValues';
import config from '@/config';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';

interface Props {
  onSubmit: (data: unknown) => Promise<void> | void;
}

const ApplicationCategoryEditForm = ({ onSubmit }: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();
  const fields = config.entities.applicationCategory.fields;

  const defaultValues = useEntityFormDefaultValues(applicationCategory, fields);

  return (
    <EntityEditForm
      name={Form.EditApplication}
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
};

export default ApplicationCategoryEditForm;
