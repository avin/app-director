import React from 'react';
import ApplicationCategoryEditForm from './ApplicationCategoryEditForm';

export default () => {
  return (
    <div className="content">
      <ApplicationCategoryEditForm id="form" onSubmit={console.log} />
    </div>
  );
};
