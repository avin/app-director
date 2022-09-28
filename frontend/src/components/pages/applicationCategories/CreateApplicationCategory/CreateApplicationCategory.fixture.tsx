import React from 'react';
import CreateApplicationCategory from './CreateApplicationCategory';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import config from '@/config';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={[config.routes.applicationCategories.create]}>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route
            path={config.routes.applicationCategories.create}
            element={<CreateApplicationCategory />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
