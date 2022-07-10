import cn from 'clsx';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import React, { useCallback, useMemo } from 'react';
import styles from './Navigation.module.scss';
import config from '@/config';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {}

const Navigation = ({}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const nodes = useMemo<TreeNodeInfo[]>(
    () => [
      {
        id: 'monitoring',
        icon: 'desktop',
        label: 'Мониторинг',
        isSelected: location.pathname === config.routes.monitoring,
        nodeData: {
          route: config.routes.monitoring,
        },
      },
      {
        id: 'applications',
        icon: 'application',
        label: 'Приложения',
        isSelected: location.pathname === config.routes.applications,
        nodeData: {
          route: config.routes.applications,
        },
      },
      {
        id: 'stands',
        icon: 'cloud',
        label: 'Стенды',
        isSelected: location.pathname === config.routes.stands,
        nodeData: {
          route: config.routes.stands,
        },
      },
      {
        id: 'organizations',
        icon: 'office',
        label: 'Организации',
        isSelected: location.pathname === config.routes.organizations,
        nodeData: {
          route: config.routes.organizations,
        },
      },
      {
        id: 'administration',
        hasCaret: true,
        icon: 'build',
        label: 'Администрирование',
        isExpanded: true,
        childNodes: [
          {
            id: 'users',
            icon: 'people',
            label: 'Пользователи',
            isSelected: location.pathname === config.routes.administration.users,
            nodeData: {
              route: config.routes.administration.users,
            },
          },
          {
            id: 'history',
            icon: 'history',
            label: 'История действий',
            isSelected: location.pathname === config.routes.administration.log,
            nodeData: {
              route: config.routes.administration.log,
            },
          },
        ],
      },
    ],
    [location.pathname],
  );

  const handleNodeClick = useCallback(
    (node) => {
      if (node.nodeData?.route) {
        navigate(node.nodeData.route);
      }
    },
    [navigate],
  );

  return (
    <div className={cn(styles.navigation, 'bp4-dark')}>
      <Tree
        contents={nodes}
        onNodeClick={handleNodeClick}
        // onNodeCollapse={handleNodeCollapse}
        // onNodeExpand={handleNodeExpand}
        // className={Classes.ELEVATION_0}
      />
    </div>
  );
};

export default Navigation;
