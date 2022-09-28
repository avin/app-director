import React from 'react';
import ApplicationEditForm from './ApplicationEditForm';

export default () => {
  return (
    <div className="content">
      <ApplicationEditForm onSubmit={console.log} />
    </div>
  );
};
