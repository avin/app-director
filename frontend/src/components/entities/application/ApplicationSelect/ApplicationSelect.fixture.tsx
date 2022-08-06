import React from 'react';
import ApplicationSelect from './ApplicationSelect';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default () => {
  const { control, watch } = useForm({ defaultValues: { applicationId: '00000000-0000-0000-0000-000000000000' } });
  const applicationId = watch('applicationId');

  return (
    <MemoryRouter>
      <div className="content">
        <ApplicationSelect name="applicationId" control={control} />
        <hr />
        {applicationId}
      </div>
    </MemoryRouter>
  );
};
