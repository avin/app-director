import { FormGroup, Intent } from '@blueprintjs/core';
import React from 'react';
import styles from './InputContainer.module.scss';
import WrappedUp from '../WrappedUp/WrappedUp';

export interface InputContainerProps extends React.PropsWithChildren<{}> {
  label?: React.ReactNode;
  labelInfo?: React.ReactNode;
  error?: React.ReactNode;
  subtext?: React.ReactNode;
  className?: string;
}

const InputContainer = ({ label, labelInfo, error, subtext, className, children }: InputContainerProps) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        intent: error ? Intent.DANGER : undefined,
      });
    }
    return child;
  });

  return (
    <FormGroup
      helperText={
        <WrappedUp open={!!error} duration={200} className={styles.errorWrapper}>
          {error}
        </WrappedUp>
      }
      label={label}
      labelInfo={labelInfo}
      intent={error ? Intent.DANGER : Intent.NONE}
    >
      {childrenWithProps}
    </FormGroup>
  );
};

export default InputContainer;
