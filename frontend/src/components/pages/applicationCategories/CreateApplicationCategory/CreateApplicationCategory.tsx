import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { createApplicationCategory } from '@/store/reducers/applicationCategories';
import config from '@/config';
import ApplicationCategoryEditForm from '@/components/forms/ApplicationCategoryEditForm/ApplicationCategoryEditForm';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const CreateApplicationCategory = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    const applicationCategory = await dispatch(createApplicationCategory());
    navigate(generatePath(config.routes.applicationCategories.view, { id: applicationCategory.id }), { replace: true });
  }, [dispatch, navigate]);

  return (
    <div>
      <ViewHeader icon={config.defaultIcons.applicationCategory} title="Добавление приложения" onClose={goBack} />
      <div className="page-content">
        <ApplicationCategoryEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateApplicationCategory;
