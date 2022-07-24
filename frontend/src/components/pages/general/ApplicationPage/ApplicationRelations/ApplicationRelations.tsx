import React, { useCallback, useState } from 'react';
import styles from './ApplicationRelations.module.scss';
import { Tab, Tabs } from '@blueprintjs/core';

interface Props {}

const ApplicationRelations = ({}: Props) => {
  const [selectedTabId, setSelectedTabId] = useState('stands');
  const handleTabChange = useCallback((tabId: string) => {
    setSelectedTabId(tabId);
  }, []);

  return (
    <div className={styles.relations}>
      <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={selectedTabId} renderActiveTabPanelOnly>
        <Tab id="stands" title="Stands" panel={<div>stands here</div>} />
      </Tabs>
    </div>
  );
};

export default ApplicationRelations;
