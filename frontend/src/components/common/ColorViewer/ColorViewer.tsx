import React from 'react';
import styles from './ColorViewer.module.scss';

interface Props {
  value: string;
}

const ColorViewer = ({ value }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.colorBlock} style={{ backgroundColor: value }} />
      <div>{value}</div>
    </div>
  );
};

export default ColorViewer;
