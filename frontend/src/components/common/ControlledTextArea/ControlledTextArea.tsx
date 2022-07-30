import { TextArea, TextAreaProps } from '@blueprintjs/core';
import cn from 'clsx';
import React from 'react';
import styles from './ControlledTextArea.module.scss';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { FieldValues, Path } from 'react-hook-form/dist/types';

interface Props<TFieldValues extends FieldValues> extends TextAreaProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
}

const ControlledTextArea = <TFieldValues,>({ name, control, rules, className, ...props }: Props<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <TextArea {...props} className={cn(className, styles.textArea)} onChange={onChange} value={String(value || '')} />
  );
};

export default ControlledTextArea;
