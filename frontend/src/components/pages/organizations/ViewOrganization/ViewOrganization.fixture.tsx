import React from 'react';
import ViewOrganization from './ViewOrganization';
import { Route, Routes, MemoryRouter, generatePath } from 'react-router-dom';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';
import config from '@/config';

export default () => {
  return (
    <MemoryRouter
      initialEntries={[
        generatePath(config.routes.applications.view, {
          id: '00000000-0000-0000-0000-000000000000',
        }),
      ]}
    >
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route
            path={config.routes.applications.view}
            element={<ViewOrganization />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
