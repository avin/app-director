import React from 'react';
import ApplicationEditForm from './ApplicationEditForm';

export default () => {
  return (
    <div className="content">
      <ApplicationEditForm id="form" onSubmit={console.log} />
    </div>
  );
};
