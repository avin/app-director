import React, { useState } from 'react';
import Search from './Search';

export default () => {
  const [val, setVal] = useState('foo');
  return (
    <div className="content">
      <Search defaultValue={val} onChange={setVal} />
      <hr />
      {val}
    </div>
  );
};
