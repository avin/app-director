import React from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextArea from './ControlledTextArea';

export default () => {
  const { control, watch } = useForm({ defaultValues: { test: 'foo' } });
  const val = watch('test');

  return (
    <div className="content">
      <ControlledTextArea name="test" control={control} />
      <hr />
      {val}
    </div>
  );
};
