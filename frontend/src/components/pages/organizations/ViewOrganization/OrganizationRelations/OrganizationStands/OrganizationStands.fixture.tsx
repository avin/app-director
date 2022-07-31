import React from 'react';
import OrganizationStands from './OrganizationStands';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <OrganizationStands />
    </MemoryRouter>
  );
};
