import React, { useCallback, useState } from 'react';
import styles from './StandCategoryRelations.module.scss';
import { Tab, Tabs } from '@blueprintjs/core';
import StandCategoryStands from './StandCategoryStands/StandCategoryStands';

interface Props {}

const StandCategoryRelations = ({}: Props) => {
  const [selectedTabId, setSelectedTabId] = useState('stands');
  const handleTabChange = useCallback((tabId: string) => {
    setSelectedTabId(tabId);
  }, []);

  return (
    <div className={styles.relations}>
      <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={selectedTabId} renderActiveTabPanelOnly large>
        <Tab id="stands" title="Приложения" panel={<StandCategoryStands />} />
      </Tabs>
    </div>
  );
};

export default StandCategoryRelations;
