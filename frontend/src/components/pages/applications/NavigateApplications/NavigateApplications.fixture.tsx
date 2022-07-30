import React from 'react';
import NavigateApplications from './NavigateApplications';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route path="*" element={<GeneralLayout />}>
          <Route path="*" element={<NavigateApplications />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
