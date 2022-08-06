import React from 'react';
import ApplicationCategoryApplications from './ApplicationCategoryApplications';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationCategoryApplications />
    </MemoryRouter>
  );
};
