import React from 'react';
import styles from './ViewApplication.module.scss';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import ApplicationRelations from './ApplicationRelations/ApplicationRelations';
import { useGoBack } from '@/utils/hooks/useGoBack';
import config from '@/config';

interface Props {}

const ViewApplication = ({}: Props) => {
  const application = useApplicationByUrlParams();
  const goBack = useGoBack();

  if (!application) {
    return <div>unknown application</div>;
  }

  return (
    <div>
      <ViewHeader
        title={application.title}
        icon={config.defaultIcons.application}
        onClose={goBack}
        controls={
          <>
            <Link to={`/applications/${application.id}/edit`} tabIndex={-1}>
              <Button intent={Intent.PRIMARY} icon="edit">
                Редактировать
              </Button>
            </Link>

            <Button intent={Intent.DANGER} icon="trash">
              Удалить
            </Button>
          </>
        }
      />

      <div className="page-content">
        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Название</h4>
          </div>
          <div className={styles.rowValue}>{application.title}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Описание</h4>
          </div>
          <div className={styles.rowValue}>{application.description}</div>
        </div>
      </div>

      <ApplicationRelations />
    </div>
  );
};

export default ViewApplication;
