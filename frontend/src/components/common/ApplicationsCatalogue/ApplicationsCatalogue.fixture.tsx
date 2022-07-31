import React from 'react';
import ApplicationsCatalogue from './ApplicationsCatalogue';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationsCatalogue columns={['title', 'description']} />
    </MemoryRouter>
  );
};
