import React from 'react';
import NavigateStands from './NavigateStands';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={['/applications']}>
      <Routes>
        <Route path="*" element={<GeneralLayout />}>
          <Route path="*" element={<NavigateStands />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
