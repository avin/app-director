import ApplicationCategoryEditForm from '@/components/forms/ApplicationCategoryEditForm/ApplicationCategoryEditForm';
import React, { useCallback } from 'react';
import styles from './EditApplicationCategory.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { updateApplicationCategory } from '@/store/reducers/applicationCategories';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useApplicationCategoryByUrlParams } from '@/utils/hooks/useApplicationCategoryByUrlParams';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const EditApplicationCategory = ({}: Props) => {
  const applicationCategory = useApplicationCategoryByUrlParams();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateApplicationCategory(applicationCategory.id));
    navigate(
      generatePath(config.routes.applicationCategories.view, {
        id: applicationCategory.id,
      }),
    );
  }, [dispatch, applicationCategory, navigate]);

  return (
    <div>
      <ViewHeader
        title={applicationCategory.title}
        icon={config.defaultIcons.applicationCategory}
        onClose={goBack}
      />
      <div className="page-content">
        <ApplicationCategoryEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditApplicationCategory;
