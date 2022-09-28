import cn from 'clsx';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import React, { useCallback, useMemo } from 'react';
import styles from './Navigation.module.scss';
import config from '@/config';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {}

type NodeData = {
  route: string;
};

const Navigation = ({}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const nodes = useMemo<TreeNodeInfo<NodeData>[]>(
    () => [
      {
        id: 'monitoring',
        icon: 'desktop',
        label: 'Мониторинг',
        isSelected: location.pathname.startsWith(config.routes.monitoring),
        nodeData: {
          route: config.routes.monitoring,
        },
      },
      {
        id: 'applications',
        icon: config.defaultIcons.application,
        label: 'Приложения',
        isSelected: location.pathname.startsWith(config.routes.applications.$),
        nodeData: {
          route: config.routes.applications.$,
        },
      },
      {
        id: 'stands',
        icon: config.defaultIcons.stand,
        label: 'Стенды',
        isSelected: location.pathname.startsWith(config.routes.stands.$),
        nodeData: {
          route: config.routes.stands.$,
        },
      },
      {
        id: 'organizations',
        icon: config.defaultIcons.organization,
        label: 'Организации',
        isSelected: location.pathname.startsWith(config.routes.organizations.$),
        nodeData: {
          route: config.routes.organizations.$,
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
            id: 'applicationCategories',
            icon: config.defaultIcons.applicationCategory,
            label: 'Категории приложений',
            isSelected: location.pathname.startsWith(
              config.routes.applicationCategories.$,
            ),
            nodeData: {
              route: config.routes.applicationCategories.$,
            },
          },
          {
            id: 'standCategories',
            icon: config.defaultIcons.standCategory,
            label: 'Категории стендов',
            isSelected: location.pathname.startsWith(
              config.routes.standCategories.$,
            ),
            nodeData: {
              route: config.routes.standCategories.$,
            },
          },
          {
            id: 'users',
            icon: 'people',
            label: 'Пользователи',
            isSelected: location.pathname.startsWith(
              config.routes.administration.users,
            ),
            nodeData: {
              route: config.routes.administration.users,
            },
          },
          {
            id: 'history',
            icon: 'history',
            label: 'История действий',
            isSelected: location.pathname.startsWith(
              config.routes.administration.log,
            ),
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
    (node: TreeNodeInfo<NodeData>) => {
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
