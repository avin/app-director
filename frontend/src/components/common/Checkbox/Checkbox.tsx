import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { CheckboxProps, Checkbox as BlueprintCheckbox } from '@blueprintjs/core';
import { FieldValues, Path } from 'react-hook-form/dist/types';

interface Props<TFieldValues extends FieldValues> extends CheckboxProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const Checkbox = <T,>({ name, control, rules, ...props }: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <BlueprintCheckbox {...props} checked={Boolean(value)} onChange={onChange} />;
};

export default Checkbox;
