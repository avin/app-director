import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { CheckboxProps, Checkbox } from '@blueprintjs/core';
import { FieldValues, Path } from 'react-hook-form/dist/types';

interface Props<TFieldValues extends FieldValues> extends CheckboxProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ControlledCheckbox = <TFieldValues,>({ name, control, rules, ...props }: Props<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <Checkbox {...props} checked={Boolean(value)} onChange={onChange} />;
};

export default ControlledCheckbox;
