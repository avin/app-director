import React from 'react';
import FitPage from './FitPage';

export default () => {
  return (
    <div className="content">
      <p>some</p>
      <p>other</p>
      <p>content</p>
      <FitPage bottomOffset={100} minHeight={100}>
        <div style={{ height: '100%', background: '#d60' }} />
      </FitPage>
    </div>
  );
};
