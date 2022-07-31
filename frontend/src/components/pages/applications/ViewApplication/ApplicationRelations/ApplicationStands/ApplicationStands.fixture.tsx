import React from 'react';
import ApplicationStands from './ApplicationStands';
import { MemoryRouter } from 'react-router-dom';

export default () => {
  return (
    <MemoryRouter>
      <ApplicationStands />
    </MemoryRouter>
  );
};
