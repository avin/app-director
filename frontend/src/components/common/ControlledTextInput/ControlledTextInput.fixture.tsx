import React from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextInput from './ControlledTextInput';

export default () => {
  const { control, watch } = useForm({ defaultValues: { test: 'foo' } });
  const val = watch('test');

  return (
    <div className="content">
      <ControlledTextInput name="test" control={control} />
      <hr />
      {val}
    </div>
  );
};
