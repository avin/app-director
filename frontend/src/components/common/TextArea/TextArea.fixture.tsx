import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from './TextArea';

export default () => {
  const { control, watch } = useForm({ defaultValues: { test: 'foo' } });
  const val = watch('test');

  return (
    <div className="content">
      <TextArea name="test" control={control} />
      <hr />
      {val}
    </div>
  );
};
