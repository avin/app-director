import React from 'react';
import ApplicationCategoriesCatalogue from './ApplicationCategoriesCatalogue';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationCategoriesCatalogue columns={['title', 'description']} />
    </MemoryRouter>
  );
};
