import React, { useCallback } from 'react';
import styles from './EditApplication.module.scss';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import config from '@/config';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import { useOrganizationByUrlParams } from '@/utils/hooks/useOrganizationByUrlParams';
import { updateOrganization } from '@/store/reducers/organizations';
import OrganizationEditForm from '@/components/forms/OrganizationEditForm/OrganizationEditForm';

interface Props {}

const EditOrganization = ({}: Props) => {
  const organization = useOrganizationByUrlParams();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleSubmitForm = useCallback(async () => {
    await dispatch(updateOrganization(organization.id));
    navigate(generatePath(config.routes.organizations.view, { id: organization.id }));
  }, [dispatch, organization, navigate]);

  return (
    <div>
      <PageHeader title={organization.title} />
      <div className="page-content">
        <OrganizationEditForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
};

export default EditOrganization;
