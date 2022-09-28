import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { createStandCategory } from '@/store/reducers/standCategories';
import config from '@/config';
import StandCategoryEditForm from '@/components/forms/StandCategoryEditForm/StandCategoryEditForm';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const CreateStandCategory = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    const standCategory = await dispatch(createStandCategory());
    navigate(
      generatePath(config.routes.standCategories.view, {
        id: standCategory.id,
      }),
      { replace: true },
    );
  }, [dispatch, navigate]);

  return (
    <div>
      <ViewHeader
        icon={config.defaultIcons.standCategory}
        title="Добавление приложения"
        onClose={goBack}
      />
      <div className="page-content">
        <StandCategoryEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateStandCategory;
