import React from 'react';
import styles from './ViewHeader.module.scss';
import cn from 'clsx';
import { Button, Icon } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import { MaybeElement } from '@blueprintjs/core/lib/esm/common';

interface Props {
  title?: React.ReactNode;
  icon?: IconName | MaybeElement;
  controls?: React.ReactNode;
  onClose?: () => void;
}

const ViewHeader = ({ title, icon, controls, onClose }: Props) => {
  return (
    <div className={styles.viewHeader}>
      <div className={styles.left}>
        {icon && <Icon size={20} icon={icon} className={styles.icon} />}
        <div className={styles.title}>{title && <h5 className={cn('bp4-heading')}>{title}</h5>}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.controls}>{controls}</div>
        <div className={styles.closeContainer}>
          {onClose && (
            <>
              {controls && <div className="bp4-navbar-divider" />}
              <Button icon="cross" onClick={onClose} className={styles.closeButton} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewHeader;
