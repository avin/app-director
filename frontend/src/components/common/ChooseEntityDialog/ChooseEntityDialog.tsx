import React from 'react';
import cn from 'clsx';
import styles from './ChooseEntityDialog.module.scss';
import { Dialog } from '@blueprintjs/core';

interface Props extends $ElementProps<typeof Dialog> {}

const ChooseEntityDialog = ({ className, children, ...props }: Props) => {
  return (
    <Dialog className={cn(styles.dialog, className)} {...props}>
      <div className={styles.dialogContent}>{children}</div>
    </Dialog>
  );
};

export default ChooseEntityDialog;
