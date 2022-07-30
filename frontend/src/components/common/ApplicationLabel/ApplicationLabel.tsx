import React from 'react';
import styles from './ApplicationLabel.module.scss';
import { useSelector } from 'react-redux';
import { applicationByIdSelector } from '@/store/selectors';
import { RootState } from '@/store/reducers';

interface Props {
  applicationId: string;
}

const ApplicationLabel = ({ applicationId }: Props) => {
  const application = useSelector((state: RootState) => applicationByIdSelector(state, applicationId));

  return <span>ATC: {application.title}</span>;
};

export default ApplicationLabel;
