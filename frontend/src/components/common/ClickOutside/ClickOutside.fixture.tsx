import React, { useState } from 'react';
import ClickOutside from './ClickOutside';

export default () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="content" style={{ display: 'flex' }}>
      <ClickOutside
        onClick={() => setIsActive(true)}
        onClickOutside={() => setIsActive(false)}
        style={{ backgroundColor: isActive ? '#0f0' : '#f00', width: 150, height: 200 }}
      >
        ClickOutside here
      </ClickOutside>

      <div style={{ backgroundColor: '#ff0', width: 150, height: 200 }}>other area</div>
    </div>
  );
};
