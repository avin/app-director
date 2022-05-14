import cn from 'clsx';
import React from 'react';
import styles from './Header.module.scss';
import Logo from './Logo/Logo';
import UserButton from '@/components/layouts/GeneralLayout/Header/UserButton/UserButton';
import { Classes } from '@blueprintjs/core';

interface Props {}

const Header = ({}: Props): JSX.Element => {
  return (
    <div className={styles.headerWrapper}>
      <div className={cn(styles.header, 'bp4-dark', Classes.ELEVATION_1)}>
        <div className={cn(styles.logoContainer)}>
          <Logo />
        </div>
        <div className={styles.main}>
          <div className={styles.controls}>s</div>
          <div className={styles.user}>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
