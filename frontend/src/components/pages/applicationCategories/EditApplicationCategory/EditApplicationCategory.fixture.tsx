import React from 'react';
import EditApplicationCategory from './EditApplicationCategory';
import { generatePath, MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';
import config from '@/config';

export default () => {
  return (
    <MemoryRouter
      initialEntries={[
        generatePath(config.routes.applicationCategories.edit, { id: '00000000-0000-0000-0000-000000000000' }),
      ]}
    >
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route path={config.routes.applicationCategories.edit} element={<EditApplicationCategory />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
