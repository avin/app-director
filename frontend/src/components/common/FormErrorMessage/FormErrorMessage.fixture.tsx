import React, { useState } from 'react';
import FormErrorMessage from './FormErrorMessage';

export default () => {
  const [show, setShow] = useState(false);

  return (
    <div className="content">
      <button type="button" onClick={() => setShow((v) => !v)}>
        Toggle
      </button>
      <hr />
      <FormErrorMessage message={show ? 'Hello message' : undefined} />
    </div>
  );
};
