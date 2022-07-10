import React from 'react';
import styles from './FormErrorMessage.module.scss';
import { Callout, Intent } from '@blueprintjs/core';
import WrappedUp from '../WrappedUp/WrappedUp';

interface Props {
  message?: React.ReactNode;
}

const FormErrorMessage = ({ message }: Props) => {
  return (
    <WrappedUp
      open={!!message}
      duration={200}
      className={styles.wrapper}
      // onExited={handleExited}
    >
      <Callout icon="warning-sign" className={styles.callout} intent={Intent.DANGER}>
        {message}
      </Callout>
    </WrappedUp>
  );
};

export default FormErrorMessage;
