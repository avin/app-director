import React from 'react';
import { useForm } from 'react-hook-form';
import Checkbox from './Checkbox';

export default () => {
  const { control, watch } = useForm({ defaultValues: { test: false } });
  const val = watch('test');

  return (
    <div className="content">
      <Checkbox name="test" control={control} label="Checkbox"/>
      <hr />
      {String(val)}
    </div>
  );
};
