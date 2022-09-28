import ApplicationEditForm from '@/components/forms/ApplicationEditForm/ApplicationEditForm';
import React, { useCallback } from 'react';
import styles from './EditApplication.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { updateApplication } from '@/store/reducers/applications';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import ViewHeader from '@/components/common/ViewHeader/ViewHeader';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { useGoBack } from '@/utils/hooks/useGoBack';

interface Props {}

const EditApplication = ({}: Props) => {
  const application = useApplicationByUrlParams();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const goBack = useGoBack();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateApplication(application.id));
    navigate(
      generatePath(config.routes.applications.view, { id: application.id }),
    );
  }, [dispatch, application, navigate]);

  return (
    <div>
      <ViewHeader
        title={application.title}
        icon={config.defaultIcons.application}
        onClose={goBack}
      />
      <div className="page-content">
        <ApplicationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditApplication;
