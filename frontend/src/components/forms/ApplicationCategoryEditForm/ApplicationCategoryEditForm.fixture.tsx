import React from 'react';
import ApplicationCategoryEditForm from './ApplicationCategoryEditForm';

export default () => {
  return (
    <div className="content">
      <ApplicationCategoryEditForm onSubmit={console.log} />
    </div>
  );
};
