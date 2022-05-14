import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { CheckboxProps, Checkbox as BlueprintCheckbox } from '@blueprintjs/core';

interface Props extends CheckboxProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

const Checkbox = ({ name, control, rules, ...props }: Props): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <BlueprintCheckbox {...props} checked={value || false} onChange={onChange} />;
};

export default Checkbox;
