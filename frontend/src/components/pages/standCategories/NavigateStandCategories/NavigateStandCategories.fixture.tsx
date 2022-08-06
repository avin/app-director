import React from 'react';
import NavigateStandCategories from './NavigateStandCategories';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={['/standCategories']}>
      <Routes>
        <Route path="*" element={<GeneralLayout />}>
          <Route path="*" element={<NavigateStandCategories />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
