import React from 'react';
import StandCategoriesCatalogue from './StandCategoriesCatalogue';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <StandCategoriesCatalogue columns={['title', 'description']} />
    </MemoryRouter>
  );
};
