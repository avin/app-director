import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { standsSelector } from '@/store/selectors';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import EntitiesCatalogue, { RowBuilderParams } from '@/components/common/EntitiesCatalogue/EntitiesCatalogue';
import { Stand } from '@/types';
import config from '@/config';
import { getStands } from '@/store/reducers/stands';
import StandCategoryLabel from '@/components/entities/standCategory/StandCategoryLabel/StandCategoryLabel';
import ApplicationLabel from '@/components/entities/application/ApplicationLabel/ApplicationLabel';
import OrganizationLabel from '@/components/entities/organization/OrganizationLabel/OrganizationLabel';

interface Props {
  columns: ('standCategory' | 'title' | 'description' | 'application' | 'organization')[];
  onClickRow?: (id: string, e?: SyntheticEvent<HTMLTableRowElement>) => void;
  viewHeaderProps?: Partial<$ElementProps<typeof ViewHeader>>;
}

const StandsCatalogue = ({ viewHeaderProps, columns, onClickRow }: Props) => {
  const dispatch: AppThunkDispatch = useDispatch();

  const headColumns = useMemo(() => {
    return columns.map((column) => {
      switch (column) {
        case 'standCategory':
          return { id: 'standCategory', label: 'Категория' };
        case 'title':
          return { id: 'title', label: 'Название' };
        case 'description':
          return { id: 'description', label: 'Описание' };
        case 'application':
          return { id: 'application', label: 'Приложение' };
        case 'organization':
          return { id: 'organization', label: 'Организация' };
        default:
          throw new Error(`unknown column`);
      }
    });
  }, [columns]);

  const handleClickRow = useCallback(
    (e: SyntheticEvent<HTMLTableRowElement>) => {
      const entityId = e.currentTarget.dataset.id as string;
      if (onClickRow) {
        onClickRow(entityId, e);
      }
    },
    [onClickRow],
  );

  const rowBuilder = useCallback(
    ({ id, entity }: RowBuilderParams<Stand>) => (
      <tr key={id} onClick={handleClickRow} data-id={id}>
        {columns.map((column) => {
          switch (column) {
            case 'standCategory':
              return (
                <td key="standCategory">
                  <StandCategoryLabel standCategoryId={entity.standCategoryId} />
                </td>
              );
            case 'title':
              return <td key="title">{entity.title}</td>;
            case 'description':
              return <td key="description">{entity.description}</td>;
            case 'application':
              return (
                <td key="application">
                  <ApplicationLabel applicationId={entity.applicationId} />
                </td>
              );
            case 'organization':
              return (
                <td key="organization">
                  {entity.organizationId && <OrganizationLabel organizationId={entity.organizationId} />}
                </td>
              );
            default:
              throw new Error(`unknown column`);
          }
        })}
      </tr>
    ),
    [columns, handleClickRow],
  );

  const getEntities = useCallback(async () => {
    return dispatch(getStands());
  }, [dispatch]);

  return (
    <EntitiesCatalogue
      viewHeaderProps={{
        title: 'Стенды',
        icon: config.defaultIcons.stand,
        ...viewHeaderProps,
      }}
      addEntityRoute={config.routes.stands.create}
      headColumns={headColumns}
      rowBuilder={rowBuilder}
      getEntities={getEntities}
      entitiesSelector={standsSelector}
    />
  );
};

export default StandsCatalogue;
