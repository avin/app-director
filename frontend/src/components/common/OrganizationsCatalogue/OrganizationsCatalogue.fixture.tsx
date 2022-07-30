import React from 'react';
import OrganizationsCatalogue from './OrganizationsCatalogue';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <OrganizationsCatalogue title="Приложения" columns={['title', 'description']} />
    </MemoryRouter>
  );
};
