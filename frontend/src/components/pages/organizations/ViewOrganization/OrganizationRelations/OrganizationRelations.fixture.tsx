import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import OrganizationRelations from './OrganizationRelations';

export default () => {
  return (
    <MemoryRouter>
      <OrganizationRelations />
    </MemoryRouter>
  );
};
