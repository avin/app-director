import React from 'react';
import SortIndicator from './SortIndicator';

export default () => {
  return (
    <div className="content">
      ASC: <SortIndicator direction="ASC" />
      DESC: <SortIndicator direction="DESC" />
    </div>
  );
};
