import React from 'react';
import StandsCatalogue from './StandsCatalogue';
import { Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <Routes>
      <Route path="*" element={<GeneralLayout />}>
        <Route path="*" element={<StandsCatalogue />} />
      </Route>
    </Routes>
  );
};
