import React from 'react';
import NavigateOrganizations from './NavigateOrganizations';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route path="*" element={<GeneralLayout />}>
          <Route path="*" element={<NavigateOrganizations />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
