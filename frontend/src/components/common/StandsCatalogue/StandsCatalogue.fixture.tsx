import React from 'react';
import StandsCatalogue from './StandsCatalogue';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <StandsCatalogue title="Приложения" columns={['title', 'description']} />
    </MemoryRouter>
  );
};
