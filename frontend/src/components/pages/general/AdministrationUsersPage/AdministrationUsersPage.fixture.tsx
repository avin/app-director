import React from 'react';
import AdministrationUsersPage from './AdministrationUsersPage';
import { Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <Routes>
      <Route path="*" element={<GeneralLayout />}>
        <Route path="*" element={<AdministrationUsersPage />} />
      </Route>
    </Routes>
  );
};
