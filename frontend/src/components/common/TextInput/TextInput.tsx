import { InputGroup, InputGroupProps2 } from '@blueprintjs/core';
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

interface Props extends InputGroupProps2 {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

const TextInput = ({ name, control, rules, ...props }: Props): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <InputGroup type="text" {...props} onChange={onChange} value={value || ''} />;
};

export default TextInput;
