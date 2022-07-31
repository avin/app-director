import React from 'react';
import styles from './ViewStand.module.scss';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import ApplicationLabel from '@/components/common/ApplicationLabel/ApplicationLabel';
import OrganizationLabel from '@/components/common/OrganizationLabel/OrganizationLabel';

interface Props {}

const ViewStand = ({}: Props) => {
  const stand = useStandByUrlParams();

  if (!stand) {
    return <div>unknown stand</div>;
  }

  return (
    <div>
      <PageHeader
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
            <ApplicationLabel applicationId={stand.applicationId} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Организация</h4>
          </div>
          <div className={styles.rowValue}>
            {stand.organizationId && <OrganizationLabel organizationId={stand.organizationId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStand;
