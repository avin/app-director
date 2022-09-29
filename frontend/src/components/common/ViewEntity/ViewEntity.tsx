import React from 'react';
import styles from './ViewEntity.module.scss';
import { useGoBack } from '@/utils/hooks/useGoBack';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import config from '@/config';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { pluralize } from '@/utils/strings';
import { get } from 'lodash-es';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';
import ApplicationLabel from '@/components/entities/application/ApplicationLabel/ApplicationLabel';
import ApplicationCategoryLabel from '@/components/entities/applicationCategory/ApplicationCategoryLabel/ApplicationCategoryLabel';
import StandCategoryLabel from '@/components/entities/standCategory/StandCategoryLabel/StandCategoryLabel';
import ColorViewer from '../ColorViewer/ColorViewer';

interface Props {
  entity: any;
  entityType: string;
  additionalContent?: React.ReactNode;
}

const ViewEntity = ({ entity, entityType, additionalContent }: Props) => {
  const goBack = useGoBack();

  const fields = config.entities[entityType]?.fields;

  if (!fields) {
    throw new Error(`unknown entityType ${entityType}`);
  }

  if (!entity) {
    return <div>unknown ${entityType}</div>;
  }

  return (
    <div>
      <ViewHeader
        title={entity.title}
        icon={config.defaultIcons[entityType]}
        onClose={goBack}
        controls={
          <>
            <Link
              to={`/${pluralize(entityType)}/${entity.id}/edit`}
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
        {fields.map((field) => {
          const valueContent = (() => {
            switch (field.type) {
              case 'text': {
                return get(entity, field.id) as string;
              }
              case 'color': {
                const value = get(entity, field.id) as string;
                return <ColorViewer value={value} />;
              }
              case 'relationSelect': {
                const relation = field.relation;
                if (!relation) {
                  throw new Error('no relation object');
                }

                const relationId = get(entity, field.id) as string;

                if (!relationId) {
                  return null;
                }

                switch (relation.relationTo) {
                  case 'application':
                    return (
                      <ApplicationLabel applicationId={relationId} linkable />
                    );
                  case 'organization':
                    return (
                      <OrganizationLabel organizationId={relationId} linkable />
                    );
                  case 'applicationCategory':
                    return (
                      <ApplicationCategoryLabel
                        applicationCategoryId={relationId}
                        linkable
                      />
                    );
                  case 'standCategory':
                    return (
                      <StandCategoryLabel
                        standCategoryId={relationId}
                        linkable
                      />
                    );
                  default:
                    throw new Error('unknown relationTo');
                }
              }
              default:
                return null;
            }
          })();

          return (
            <div className={styles.row} key={field.id}>
              <div className={styles.rowTitle}>
                <h4>{field.label}</h4>
              </div>
              <div className={styles.rowValue}>{valueContent || '-'}</div>
            </div>
          );
        })}
      </div>

      {additionalContent}
    </div>
  );
};

export default ViewEntity;
