import React from 'react';
import CreateApplication from './CreateApplication';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import config from '@/config';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={[config.routes.applications.create]}>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route
            path={config.routes.applications.create}
            element={<CreateApplication />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
