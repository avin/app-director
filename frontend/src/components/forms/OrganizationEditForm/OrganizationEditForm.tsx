import React from 'react';
import { useOrganizationByUrlParams } from '@/utils/hooks/useOrganizationByUrlParams';
import { Form } from '@/constants/form';
import { useEntityFormDefaultValues } from '@/utils/hooks/useEntityFormDefaultValues';
import config from '@/config';
import EntityEditForm from '@/components/common/EntityEditForm/EntityEditForm';

interface Props {
  onSubmit: (data: unknown) => Promise<void> | void;
}

const OrganizationEditForm = ({ onSubmit }: Props) => {
  const organization = useOrganizationByUrlParams();
  const fields = config.entities.organization.fields;

  const defaultValues = useEntityFormDefaultValues(organization, fields);

  return (
    <EntityEditForm
      name={Form.EditApplication}
      onSubmit={onSubmit}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
};

export default OrganizationEditForm;
