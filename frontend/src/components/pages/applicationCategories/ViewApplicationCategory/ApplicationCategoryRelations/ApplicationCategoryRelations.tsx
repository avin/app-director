import React, { useCallback, useState } from 'react';
import styles from './ApplicationCategoryRelations.module.scss';
import { Tab, Tabs } from '@blueprintjs/core';
import ApplicationCategoryApplications from './ApplicationCategoryApplications/ApplicationCategoryApplications';

interface Props {}

const ApplicationCategoryRelations = ({}: Props) => {
  const [selectedTabId, setSelectedTabId] = useState('stands');
  const handleTabChange = useCallback((tabId: string) => {
    setSelectedTabId(tabId);
  }, []);

  return (
    <div className={styles.relations}>
      <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={selectedTabId} renderActiveTabPanelOnly large>
        <Tab id="stands" title="Приложения" panel={<ApplicationCategoryApplications />} />
      </Tabs>
    </div>
  );
};

export default ApplicationCategoryRelations;
