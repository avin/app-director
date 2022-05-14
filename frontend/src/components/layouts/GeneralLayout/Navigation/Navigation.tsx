import cn from 'clsx';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import React from 'react';
import styles from './Navigation.module.scss';

interface Props {}

const Navigation = ({}: Props): JSX.Element => {
  const nodes: TreeNodeInfo[] = [
    {
      id: 0,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Folder 0',
      isExpanded: true,
      childNodes: [
        {
          id: 2,
          icon: 'document',
          label: 'Item 0',
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
