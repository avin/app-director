import { InputGroup, InputGroupProps2 } from '@blueprintjs/core';
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { FieldValues, Path } from 'react-hook-form/dist/types';

interface Props<TFieldValues extends FieldValues> extends InputGroupProps2 {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ControlledTextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: Props<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <InputGroup
      type="text"
      {...props}
      onChange={onChange}
      value={String(value || '')}
    />
  );
};

export default ControlledTextInput;
