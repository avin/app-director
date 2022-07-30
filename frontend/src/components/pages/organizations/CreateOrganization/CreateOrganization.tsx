import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import { createOrganization } from '@/store/reducers/organizations';
import OrganizationEditForm from '@/components/forms/OrganizationEditForm/OrganizationEditForm';

interface Props {}

const CreateOrganization = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    const organization = await dispatch(createOrganization());
    navigate(generatePath(config.routes.organizations.view, { id: organization.id }));
  }, [dispatch, navigate]);

  return (
    <div>
      <PageHeader title="Добавление организации" />
      <div className="page-content">
        <OrganizationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default CreateOrganization;
