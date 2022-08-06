import React from 'react';
import NavigateApplicationCategories from './NavigateApplicationCategories';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={['/applicationCategories']}>
      <Routes>
        <Route path="*" element={<GeneralLayout />}>
          <Route path="*" element={<NavigateApplicationCategories />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
