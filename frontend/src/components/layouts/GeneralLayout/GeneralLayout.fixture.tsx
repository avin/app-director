import { Route, Routes } from 'react-router-dom';
import React from 'react';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <Routes>
      <Route path="*" element={<GeneralLayout />}>
        <Route path="*" element={<div>content</div>} />
      </Route>
    </Routes>
  );
};
