import React from 'react';
import ViewApplicationCategory from './ViewApplicationCategory';
import { Route, Routes, MemoryRouter, generatePath } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';
import config from '@/config';

export default () => {
  return (
    <MemoryRouter
      initialEntries={[
        generatePath(config.routes.applicationCategories.view, { id: '00000000-0000-0000-0000-000000000000' }),
      ]}
    >
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route path={config.routes.applicationCategories.view} element={<ViewApplicationCategory />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
