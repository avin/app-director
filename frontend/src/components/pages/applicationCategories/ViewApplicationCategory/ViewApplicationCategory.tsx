import React from 'react';
import styles from './ViewApplicationCategory.module.scss';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import ApplicationCategoryRelations from './ApplicationCategoryRelations/ApplicationCategoryRelations';
import { useGoBack } from '@/utils/hooks/useGoBack';
import config from '@/config';

interface Props {}

const ViewApplicationCategory = ({}: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();
  const goBack = useGoBack();

  if (!applicationCategory) {
    return <div>unknown applicationCategory</div>;
  }

  return (
    <div>
      <ViewHeader
        title={applicationCategory.title}
        icon={config.defaultIcons.applicationCategory}
        onClose={goBack}
        controls={
          <>
            <Link to={`/applicationCategories/${applicationCategory.id}/edit`} tabIndex={-1}>
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
          <div className={styles.rowValue}>{applicationCategory.title}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Описание</h4>
          </div>
          <div className={styles.rowValue}>{applicationCategory.description}</div>
        </div>
      </div>

      <ApplicationCategoryRelations />
    </div>
  );
};

export default ViewApplicationCategory;
