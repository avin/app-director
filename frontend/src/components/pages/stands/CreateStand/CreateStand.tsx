import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { createStand } from '@/store/reducers/stands';
import config from '@/config';
import StandEditForm from '@/components/forms/StandEditForm/StandEditForm';
import PageHeader from '@/components/common/PageHeader/PageHeader';

interface Props {}

const CreateStand = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    const stand = await dispatch(createStand());
    navigate(generatePath(config.routes.stands.view, { id: stand.id }));
  }, [dispatch, navigate]);

  return (
    <div>
      <PageHeader title="Добавление стенда" />
      <div className="page-content">
        <StandEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateStand;
