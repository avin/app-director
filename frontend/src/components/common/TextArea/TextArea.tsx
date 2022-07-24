import { TextArea as BlueprintTextArea, TextAreaProps } from '@blueprintjs/core';
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { FieldValues, Path } from 'react-hook-form/dist/types';

interface Props<TFieldValues extends FieldValues> extends TextAreaProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const TextArea = <T,>({ name, control, rules, ...props }: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <BlueprintTextArea {...props} onChange={onChange} value={String(value || '')} />;
};

export default TextArea;
