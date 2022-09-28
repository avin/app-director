import React from 'react';
import OrganizationEditForm from './OrganizationEditForm';

export default () => {
  return (
    <div className="content">
      <OrganizationEditForm onSubmit={console.log} />
    </div>
  );
};
