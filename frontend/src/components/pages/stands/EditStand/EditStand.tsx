import React, { useCallback } from 'react';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { updateApplication } from '@/store/reducers/applications';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import { useStandByUrlParams } from '@/utils/hooks/useStandByUrlParams';
import StandEditForm from '@/components/forms/StandEditForm/StandEditForm';

interface Props {}

const EditStand = ({}: Props) => {
  const stand = useStandByUrlParams();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateApplication(stand.id));
    navigate(generatePath(config.routes.stands.view, { id: stand.id }));
  }, [dispatch, stand, navigate]);

  return (
    <div>
      <PageHeader title={stand.title} />
      <div className="page-content">
        <StandEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditStand;
