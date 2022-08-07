import { Icon } from '@blueprintjs/core';
import cn from 'clsx';
import React from 'react';
import styles from './SortIndicator.module.scss';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  direction: 'DESC' | 'ASC';
}

const SortIndicator = ({ className, direction }: Props) => {
  return (
    <div className={cn(className, styles.container)}>
      <Icon icon={direction === 'ASC' ? 'caret-up' : 'caret-down'} size={16} />
    </div>
  );
};

export default SortIndicator;
