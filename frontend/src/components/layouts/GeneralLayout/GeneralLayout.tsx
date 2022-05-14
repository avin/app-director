import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './GeneralLayout.module.scss';

interface Props {}

const GeneralLayout = ({}: Props): JSX.Element => {
  return (
    <div>
      GeneralLayout here
      <hr />
      <Outlet />
    </div>
  );
};

export default GeneralLayout;
