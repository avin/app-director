import React from 'react';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { Form } from '@/constants/form';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';
import config from '@/config';
import { useEntityFormDefaultValues } from '@/utils/hooks/useEntityFormDefaultValues';

interface Props {
  onSubmit: (data: unknown) => Promise<void> | void;
}

const ApplicationEditForm = ({ onSubmit }: Props) => {
  const application = useApplicationByUrlParams();
  const fields = config.entities.application.fields;

  const defaultValues = useEntityFormDefaultValues(application, fields);

  return (
    <EntityEditForm
      name={Form.EditApplication}
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
};

export default ApplicationEditForm;
