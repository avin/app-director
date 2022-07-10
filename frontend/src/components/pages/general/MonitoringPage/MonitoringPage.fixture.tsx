import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MonitoringPage from './MonitoringPage';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <Routes>
      <Route path="*" element={<GeneralLayout />}>
        <Route path="*" element={<MonitoringPage />} />
      </Route>
    </Routes>
  );
};
