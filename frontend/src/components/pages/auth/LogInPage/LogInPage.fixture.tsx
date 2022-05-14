import React from 'react';
import LogInPage from './LogInPage';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout/AuthLayout';

export default (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<AuthLayout />}>
        <Route path="*" element={<LogInPage />} />
      </Route>
    </Routes>
  );
};
