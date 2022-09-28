import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { createApplication } from '@/store/reducers/applications';
import config from '@/config';
import ApplicationEditForm from '@/components/forms/ApplicationEditForm/ApplicationEditForm';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const CreateApplication = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    const application = await dispatch(createApplication());
    navigate(
      generatePath(config.routes.applications.view, { id: application.id }),
      { replace: true },
    );
  }, [dispatch, navigate]);

  return (
    <div>
      <ViewHeader
        icon={config.defaultIcons.application}
        title="Добавление приложения"
        onClose={goBack}
      />
      <div className="page-content">
        <ApplicationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateApplication;
