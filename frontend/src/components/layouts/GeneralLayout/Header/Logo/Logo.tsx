import React from 'react';
import styles from './Logo.module.scss';
import { Icon } from '@blueprintjs/core';

interface Props {}

const Logo = ({}: Props): JSX.Element => {
  return (
    <div className={styles.logo}>
      <Icon icon="graph" />
      <div className={styles.title}>AppInspector</div>
    </div>
  );
};

export default Logo;
