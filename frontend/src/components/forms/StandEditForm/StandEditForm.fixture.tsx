import React from 'react';
import StandEditForm from './StandEditForm';

export default () => {
  return (
    <div className="content">
      <StandEditForm onSubmit={console.log} />
    </div>
  );
};
