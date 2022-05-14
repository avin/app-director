import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AuthLayout from './AuthLayout';
import LogInPage from '@/components/pages/auth/LogInPage/LogInPage';

export default (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<AuthLayout />}>
        <Route path="*" element={<div>content</div>} />
      </Route>
    </Routes>
  );
};
