import React from 'react';
import StandCategoryEditForm from './StandCategoryEditForm';

export default () => {
  return (
    <div className="content">
      <StandCategoryEditForm onSubmit={console.log} />
    </div>
  );
};
