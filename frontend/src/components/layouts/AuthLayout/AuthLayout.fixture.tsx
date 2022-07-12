import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AuthLayout from './AuthLayout';

export default () => {
  return (
    <Routes>
      <Route path="*" element={<AuthLayout />}>
        <Route path="*" element={<div>content</div>} />
      </Route>
    </Routes>
  );
};
