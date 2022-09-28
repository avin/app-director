import React from 'react';
import styles from './ViewStandCategory.module.scss';
import { useStandCategoryByUrlParams } from '@/utils/hooks/useStandCategoryByUrlParams';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import StandCategoryRelations from './StandCategoryRelations/StandCategoryRelations';
import { useGoBack } from '@/utils/hooks/useGoBack';
import config from '@/config';

interface Props {}

const ViewStandCategory = ({}: Props) => {
  const standCategory = useStandCategoryByUrlParams();
  const goBack = useGoBack();

  if (!standCategory) {
    return <div>unknown standCategory</div>;
  }

  return (
    <div>
      <ViewHeader
        title={standCategory.title}
        icon={config.defaultIcons.standCategory}
        onClose={goBack}
        controls={
          <>
            <Link
              to={`/standCategories/${standCategory.id}/edit`}
              tabIndex={-1}
            >
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
          <div className={styles.rowValue}>{standCategory.title}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTitle}>
            <h4>Описание</h4>
          </div>
          <div className={styles.rowValue}>{standCategory.description}</div>
        </div>
      </div>

      <StandCategoryRelations />
    </div>
  );
};

export default ViewStandCategory;
