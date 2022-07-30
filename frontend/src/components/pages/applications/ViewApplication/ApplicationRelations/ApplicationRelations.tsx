import React, { useCallback, useState } from 'react';
import styles from './ApplicationRelations.module.scss';
import { Tab, Tabs } from '@blueprintjs/core';
import Stands from '@/components/pages/applications/ViewApplication/ApplicationRelations/Stands/Stands';

interface Props {}

const ApplicationRelations = ({}: Props) => {
  const [selectedTabId, setSelectedTabId] = useState('stands');
  const handleTabChange = useCallback((tabId: string) => {
    setSelectedTabId(tabId);
  }, []);

  return (
    <div className={styles.relations}>
      <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={selectedTabId} renderActiveTabPanelOnly large>
        <Tab id="stands" title="Стенды" panel={<Stands />} />
      </Tabs>
    </div>
  );
};

export default ApplicationRelations;
