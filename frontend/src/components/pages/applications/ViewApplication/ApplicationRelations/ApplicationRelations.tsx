import React, { useCallback, useState } from 'react';
import styles from './ApplicationRelations.module.scss';
import { Tab, Tabs } from '@blueprintjs/core';
import ApplicationStands from '@/components/pages/applications/ViewApplication/ApplicationRelations/ApplicationStands/ApplicationStands';

interface Props {}

const ApplicationRelations = ({}: Props) => {
  const [selectedTabId, setSelectedTabId] = useState('stands');
  const handleTabChange = useCallback((tabId: string) => {
    setSelectedTabId(tabId);
  }, []);

  return (
    <div className={styles.relations}>
      <Tabs
        id="TabsExample"
        onChange={handleTabChange}
        selectedTabId={selectedTabId}
        renderActiveTabPanelOnly
        large
      >
        <Tab id="stands" title="Стенды" panel={<ApplicationStands />} />
      </Tabs>
    </div>
  );
};

export default ApplicationRelations;
