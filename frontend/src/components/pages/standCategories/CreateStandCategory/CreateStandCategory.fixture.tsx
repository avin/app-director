import React from 'react';
import CreateStandCategory from './CreateStandCategory';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import config from '@/config';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';

export default () => {
  return (
    <MemoryRouter initialEntries={[config.routes.standCategories.create]}>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route
            path={config.routes.standCategories.create}
            element={<CreateStandCategory />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
