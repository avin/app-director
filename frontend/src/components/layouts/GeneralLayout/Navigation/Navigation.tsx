import cn from 'clsx';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import React from 'react';
import styles from './Navigation.module.scss';

interface Props {}

const Navigation = ({}: Props): JSX.Element => {
  const nodes: TreeNodeInfo[] = [
    {
      id: 'control',
      hasCaret: true,
      icon: 'eye-open',
      label: 'Контроль',
      isExpanded: true,
      childNodes: [
        {
          id: 'monitoring',
          icon: 'desktop',
          label: 'Мониторинг',
        },
        {
          id: 'registry',
          icon: 'database',
          label: 'Реестр',
        },
      ],
    },
    {
      id: 'moderate',
      hasCaret: true,
      icon: 'edit',
      label: 'Управление',
      isExpanded: true,
      childNodes: [
        {
          id: 'apps',
          icon: 'graph',
          label: 'Приложения',
        },
        {
          id: 'orgs',
          icon: 'heat-grid',
          label: 'Организации',
        },
      ],
    },
    {
      id: 'administrate',
      hasCaret: true,
      icon: 'build',
      label: 'Администрирование',
      isExpanded: true,
      childNodes: [
        {
          id: 'users',
          icon: 'people',
          label: 'Пользователи',
        },
        {
          id: 'history',
          icon: 'history',
          label: 'История действий',
        },
      ],
    },
  ];

  return (
    <div className={cn(styles.navigation, 'bp4-dark')}>
      <Tree
        contents={nodes}
        // onNodeClick={handleNodeClick}
        // onNodeCollapse={handleNodeCollapse}
        // onNodeExpand={handleNodeExpand}
        // className={Classes.ELEVATION_0}
      />
    </div>
  );
};

export default Navigation;
