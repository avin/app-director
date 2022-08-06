import React from 'react';
import styles from './ViewStand.module.scss';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import ApplicationLabel from '@/components/entities/application/ApplicationLabel/ApplicationLabel';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';

interface Props {}

const ViewStand = ({}: Props) => {
  const stand = useStandByUrlParams();

  if (!stand) {
    return <div>unknown stand</div>;
  }

  return (
    <div>
      <ViewHeader
        title={stand.title}
        controls={
          <>
            <Link to={`/stands/${stand.id}/edit`} tabIndex={-1}>
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
          <div className={styles.rowValue}>{stand.title}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Описание</h4>
          </div>
          <div className={styles.rowValue}>{stand.description}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Приложение</h4>
          </div>
          <div className={styles.rowValue}>
            <ApplicationLabel applicationId={stand.applicationId} linkable />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Организация</h4>
          </div>
          <div className={styles.rowValue}>
            {stand.organizationId && <OrganizationLabel organizationId={stand.organizationId} linkable />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStand;
