import StandCategoryEditForm from '@/components/forms/StandCategoryEditForm/StandCategoryEditForm';
import React, { useCallback } from 'react';
import styles from './EditStandCategory.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { updateStandCategory } from '@/store/reducers/standCategories';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useStandCategoryByUrlParams } from '@/utils/hooks/useStandCategoryByUrlParams';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const EditStandCategory = ({}: Props) => {
  const standCategory = useStandCategoryByUrlParams();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateStandCategory(standCategory.id));
    navigate(
      generatePath(config.routes.standCategories.view, {
        id: standCategory.id,
      }),
    );
  }, [dispatch, standCategory, navigate]);

  return (
    <div>
      <ViewHeader
        title={standCategory.title}
        icon={config.defaultIcons.standCategory}
        onClose={goBack}
      />
      <div className="page-content">
        <StandCategoryEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditStandCategory;
