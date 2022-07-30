import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ApplicationRelations from './ApplicationRelations';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationRelations />
    </MemoryRouter>
  );
};
