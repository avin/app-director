import React from 'react';
import ApplicationCategorySelect from './ApplicationCategorySelect';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default () => {
  const { control, watch } = useForm({
    defaultValues: {
      applicationCategoryId: '00000000-0000-0000-0000-000000000000',
    },
  });
  const applicationCategoryId = watch('applicationCategoryId');

  return (
    <MemoryRouter>
      <div className="content">
        <ApplicationCategorySelect
          name="applicationCategoryId"
          control={control}
        />
        <hr />
        {applicationCategoryId}
      </div>
    </MemoryRouter>
  );
};
