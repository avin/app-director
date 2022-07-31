import React from 'react';
import styles from './ViewOrganization.module.scss';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import OrganizationRelations from './OrganizationRelations/OrganizationRelations';
import { useOrganizationByUrlParams } from '@/utils/hooks/useOrganizationByUrlParams';

interface Props {}

const ViewOrganization = ({}: Props) => {
  const organization = useOrganizationByUrlParams();

  if (!organization) {
    return <div>unknown organization</div>;
  }

  return (
    <div>
      <ViewHeader
        title={organization.title}
        controls={
          <>
            <Link to={`/organizations/${organization.id}/edit`} tabIndex={-1}>
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
          <div className={styles.rowValue}>{organization.title}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Описание</h4>
          </div>
          <div className={styles.rowValue}>{organization.description}</div>
        </div>
      </div>

      <OrganizationRelations />
    </div>
  );
};

export default ViewOrganization;
