import React from 'react';
import styles from './PageHeader.module.scss';
import cn from 'clsx';

interface Props {
  title?: React.ReactNode;
  controls?: React.ReactNode;
}

const PageHeader = ({ title, controls }: Props) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.title}>{title && <h4 className={cn('bp4-heading')}>{title}</h4>}</div>
      <div className={styles.controls}>{controls}</div>
    </div>
  );
};

export default PageHeader;
