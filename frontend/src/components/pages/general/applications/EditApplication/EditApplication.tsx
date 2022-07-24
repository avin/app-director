import ApplicationEditForm from '@/components/forms/ApplicationEditForm/ApplicationEditForm';
import React, { useCallback } from 'react';
import styles from './EditApplication.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { updateApplication } from '@/store/reducers/data';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import { useApplicationByUrlParams } from '@/utils/hooks/useApplicationByUrlParams';
import { Application } from '@/types';

interface Props {}

const EditApplication = ({}: Props) => {
  const application = useApplicationByUrlParams() as Application;
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateApplication(application.id));
    navigate(config.routes.applications.view.replace(':id', application.id));
  }, [dispatch, application, navigate]);

  return (
    <div>
      <PageHeader title={application.title} />
      <div className={styles.content}>
        <ApplicationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditApplication;
