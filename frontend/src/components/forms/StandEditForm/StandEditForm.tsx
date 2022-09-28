import React from 'react';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import { Form } from '@/constants/form';
import { useEntityFormDefaultValues } from '@/utils/hooks/useEntityFormDefaultValues';
import config from '@/config';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';

interface Props {
  onSubmit: (data: unknown) => Promise<void> | void;
}

const StandEditForm = ({ onSubmit }: Props) => {
  const stand = useStandByUrlParams();
  const fields = config.entities.stand.fields;

  const defaultValues = useEntityFormDefaultValues(stand, fields);

  return (
    <EntityEditForm
      name={Form.EditApplication}
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
};

export default StandEditForm;
