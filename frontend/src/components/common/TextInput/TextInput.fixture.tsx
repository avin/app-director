import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';

export default () => {
  const { control, watch } = useForm({ defaultValues: { test: 'foo' } });
  const val = watch('test');

  return (
    <div className="content">
      <TextInput name="test" control={control} />
      <hr />
      {val}
    </div>
  );
};
