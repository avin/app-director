import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { createApplication } from '@/store/reducers/data';
import config from '@/config';
import ApplicationEditForm from '@/components/forms/ApplicationEditForm/ApplicationEditForm';
import PageHeader from '@/components/common/PageHeader/PageHeader';

interface Props {}

const CreateApplication = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    const application = await dispatch(createApplication());
    navigate(config.routes.applications.view.replace(':id', application.id));
  }, [dispatch, navigate]);

  return (
    <div>
      <PageHeader title="Добавление приложения" />
      <div className="page-content">
        <ApplicationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateApplication;
