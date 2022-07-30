import React from 'react';
import OrganizationSelect from './OrganizationSelect';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default () => {
  const { control, watch } = useForm({ defaultValues: { organizationId: '00000000-0000-0000-0000-000000000000' } });
  const organizationId = watch('organizationId');

  return (
    <MemoryRouter>
      <div className="content">
        <OrganizationSelect name="organizationId" control={control} />
        <hr />
        {organizationId}
      </div>
    </MemoryRouter>
  );
};
