import React from 'react';
import StandCategorySelect from './StandCategorySelect';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default () => {
  const { control, watch } = useForm({ defaultValues: { standCategoryId: '00000000-0000-0000-0000-000000000000' } });
  const standCategoryId = watch('standCategoryId');

  return (
    <MemoryRouter>
      <div className="content">
        <StandCategorySelect name="standCategoryId" control={control} />
        <hr />
        {standCategoryId}
      </div>
    </MemoryRouter>
  );
};
