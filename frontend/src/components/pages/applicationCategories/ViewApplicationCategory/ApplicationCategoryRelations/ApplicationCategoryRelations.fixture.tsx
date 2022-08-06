import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ApplicationCategoryRelations from './ApplicationCategoryRelations';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationCategoryRelations />
    </MemoryRouter>
  );
};
