import { Button, Icon, Intent } from '@blueprintjs/core';
import cn from 'clsx';
import React, { useCallback, useState } from 'react';
import styles from './ApplicationPage.module.scss';
import ApplicationRelations from '@/components/pages/general/ApplicationPage/ApplicationRelations/ApplicationRelations';
import ApplicationEdit from '@/components/pages/general/ApplicationPage/ApplicationEdit/ApplicationEdit';
import ApplicationView from './ApplicationView/ApplicationView';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';

interface Props {}

const ApplicationPage = ({}: Props) => {
  const application = useApplicationByUrlParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleEditMode = useCallback(() => {
    setIsEditMode((v) => !v);
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon icon="add-clip" />
          <h4 className={cn('bp4-heading')}>{application.title}</h4>
        </div>

        <div className={styles.controls}>
          {isEditMode ? (
            <>
              <Button intent={Intent.SUCCESS} onClick={handleToggleEditMode} icon="floppy-disk">
                Save
              </Button>

              <Button intent={Intent.DANGER} onClick={handleToggleEditMode} icon="trash">
                Remove
              </Button>

              <Button intent={Intent.NONE} onClick={handleToggleEditMode} icon="cross" />
            </>
          ) : (
            <Button intent={Intent.NONE} onClick={handleToggleEditMode} icon="edit">
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className={styles.content}>{isEditMode ? <ApplicationEdit /> : <ApplicationView />}</div>

      <ApplicationRelations />
    </div>
  );
};

export default ApplicationPage;
