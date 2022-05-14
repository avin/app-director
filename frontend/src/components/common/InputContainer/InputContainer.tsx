import cn from 'clsx';
import { Label } from '@blueprintjs/core';
import React from 'react';
import styles from './InputContainer.module.scss';
import WrappedUp from '../WrappedUp/WrappedUp';

export interface InputContainerProps extends React.PropsWithChildren<{}> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  subtext?: React.ReactNode;
  className?: string;
}

const InputContainer = ({ label, error, subtext, className, children }: InputContainerProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className, { withError: !!error })}>
      <Label>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.inputContainer}>{children}</div>

        {subtext && (
          <div className={styles.subtextContainer}>
            <div className={styles.subtext}>{subtext}</div>
          </div>
        )}

        <WrappedUp open={!!error} duration={200} className={styles.errorWrapper}>
          <div className={styles.errorContainer}>
            <div className={styles.error}>{error}</div>
          </div>
        </WrappedUp>
      </Label>
    </div>
  );
};

export default InputContainer;
