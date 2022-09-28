import React from 'react';
import EditOrganization from './EditOrganization';
import { generatePath, MemoryRouter, Route, Routes } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';
import config from '@/config';

export default () => {
  return (
    <MemoryRouter
      initialEntries={[
        generatePath(config.routes.applications.edit, {
          id: '00000000-0000-0000-0000-000000000000',
        }),
      ]}
    >
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route
            path={config.routes.applications.edit}
            element={<EditOrganization />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
